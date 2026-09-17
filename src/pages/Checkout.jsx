import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiDownload, FiShield } from "react-icons/fi";
import { getBookByIdApi } from "../api/bookApi";
import { createCashfreeOrderApi, verifyCashfreePaymentApi, getMyOrdersApi } from "../api/orderApi";
import { loadCashfreeScript, getCashfreeInstance } from "../utils/cashfree";
import { formatINR } from "../utils/format";
import Loader from "../components/common/Loader";

const FALLBACK_COVER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg width='120' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23DED2B3'/%3E%3C/svg%3E";

export default function Checkout() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alreadyOwned, setAlreadyOwned] = useState(false);
  const [paying, setPaying] = useState(false);
  const apiOrigin = (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([getBookByIdApi(bookId), getMyOrdersApi().catch(() => ({ data: { orders: [] } }))])
      .then(([bookRes, ordersRes]) => {
        if (cancelled) return;
        setBook(bookRes.data.book);
        const owns = (ordersRes.data.orders || []).some(
          (o) => o.isPaid && o.items.some((i) => i.book === bookId)
        );
        setAlreadyOwned(owns);
      })
      .catch(() => {
        if (!cancelled) setBook(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [bookId]);

  const handlePay = async () => {
    setPaying(true);
    try {
      const { data } = await createCashfreeOrderApi(bookId);

      const scriptLoaded = await loadCashfreeScript();
      if (!scriptLoaded || !window.Cashfree) {
        toast.error("Could not load the payment gateway. Check your connection and try again.");
        setPaying(false);
        return;
      }

      const cashfree = getCashfreeInstance();

      const result = await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_modal",
      });

      if (result.error) {
        // User closed the checkout modal, or the attempt failed before completion.
        toast.error(result.error.message || "Payment was not completed.");
        setPaying(false);
        return;
      }

      // Cashfree's modal doesn't hand back a signed payment result the way
      // Razorpay's did — the source of truth is the order's status on
      // Cashfree's side, so we always confirm it with our backend.
      try {
        await verifyCashfreePaymentApi({ cashfreeOrderId: data.cashfreeOrderId });
        toast.success("Payment successful! Your PDF is ready to download.");
        navigate("/orders");
      } catch (err) {
        toast.error(err.response?.data?.message || "Payment verification failed");
      } finally {
        setPaying(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not start payment");
      setPaying(false);
    }
  };

  if (loading) return <Loader label="Loading checkout..." />;

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center text-ink-soft">
        Book not found.{" "}
        <Link to="/books" className="text-oxblood hover:underline">
          Back to browsing
        </Link>
      </div>
    );
  }

  const cover = book.image
    ? book.image.startsWith("http")
      ? book.image
      : `${apiOrigin}${book.image}`
    : FALLBACK_COVER;

  const hasDiscount = book.discountPrice > 0 && book.discountPrice < book.price;
  const price = hasDiscount ? book.discountPrice : book.price;

  return (
    <div className="max-w-xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <h1 className="section-heading mb-8">Checkout</h1>

      <div className="flex items-center gap-4 border border-ink/10 p-4">
        <img src={cover} alt={book.title} className="w-16 h-20 object-cover bg-paper-dark shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-display text-ink truncate">{book.title}</p>
          <p className="text-sm text-ink-soft">{book.author}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-medium text-ink">{formatINR(price)}</p>
          {hasDiscount && <p className="text-xs text-ink-soft line-through">{formatINR(book.price)}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 text-sm text-ink-soft">
        <FiDownload />
        <span>You'll get an instant PDF download after payment.</span>
      </div>

      <div className="flex justify-between items-center mt-8 pt-4 border-t border-ink/10">
        <span className="text-ink-soft">Total</span>
        <span className="text-xl font-medium text-ink">{formatINR(price)}</span>
      </div>

      {alreadyOwned ? (
        <div className="mt-6 p-4 bg-forest/5 border border-forest/20 text-sm text-forest">
          You already own this book.{" "}
          <Link to="/orders" className="underline font-medium">
            Go to My Orders to download it
          </Link>
          .
        </div>
      ) : (
        <button onClick={handlePay} disabled={paying} className="btn-primary w-full mt-6 disabled:opacity-60">
          {paying ? "Opening payment..." : `Pay ${formatINR(price)}`}
        </button>
      )}

      <p className="flex items-center gap-2 justify-center mt-4 text-xs text-ink-soft">
        <FiShield />
        Payments are securely processed by Cashfree.
      </p>
    </div>
  );
}
