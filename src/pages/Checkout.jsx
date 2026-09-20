import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiDownload, FiShield, FiPhone, FiCheckCircle, FiMail } from "react-icons/fi";
import { getBookByIdApi } from "../api/bookApi";
import { createRazorpayOrderApi, verifyRazorpayPaymentApi, getDownloadUrl } from "../api/orderApi";
import { openRazorpayCheckout } from "../utils/razorpay";
import { formatINR } from "../utils/format";
import Loader from "../components/common/Loader";

const FALLBACK_COVER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg width='120' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23DED2B3'/%3E%3C/svg%3E";

const SUPPORT_PHONE = "+91 9473768596";
const SUPPORT_PHONE_HREF = "+919473768596";
const EMAIL_RE = /^\S+@\S+\.\S+$/;

// Programmatically "clicking" a link is the most reliable way to make the
// browser start a file download (respects the server's Content-Disposition
// header) without navigating the single-page app away from this screen.
function triggerDownload(url) {
  const link = document.createElement("a");
  link.href = url;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function Checkout() {
  const { bookId } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [paying, setPaying] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const apiOrigin = (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getBookByIdApi(bookId)
      .then(({ data }) => {
        if (!cancelled) setBook(data.book);
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

  const startDownload = (relativeUrl) => {
    const fullUrl = getDownloadUrl(relativeUrl);
    setDownloadUrl(fullUrl);
    triggerDownload(fullUrl);
  };

  const handlePay = async () => {
    const trimmedEmail = email.trim();
    if (!EMAIL_RE.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setPaying(true);

    try {
      const { data } = await createRazorpayOrderApi({ bookId, email: trimmedEmail });

      if (data.alreadyPurchased) {
        toast.success("You've already bought this book — downloading again.");
        startDownload(data.downloadUrl);
        setPaying(false);
        return;
      }

      await openRazorpayCheckout({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.razorpayOrderId,
        name: "TenPages",
        description: data.book.title,
        prefill: { email: trimmedEmail },
        theme: { color: "#6b1f1f" },
        modal: {
          ondismiss: () => setPaying(false),
        },
        handler: async (response) => {
          try {
            const verifyRes = await verifyRazorpayPaymentApi({
              orderId: data.orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast.success("Payment successful! Your PDF is downloading now.");
            startDownload(verifyRes.data.downloadUrl);
          } catch (err) {
            toast.error(err.response?.data?.message || "Payment verification failed. Contact support.");
          } finally {
            setPaying(false);
          }
        },
        onFailed: (response) => {
          toast.error(response?.error?.description || "Payment failed. Please try again.");
          setPaying(false);
        },
      });
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
    <div className="max-w-xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16">
      <h1 className="section-heading mb-6 sm:mb-8">Checkout</h1>

      <div className="flex items-center gap-3 sm:gap-4 border border-ink/10 p-3 sm:p-4">
        <img
          src={cover}
          alt={book.title}
          className="w-14 h-18 sm:w-16 sm:h-20 object-cover bg-paper-dark shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="font-display text-ink truncate text-sm sm:text-base">{book.title}</p>
          <p className="text-xs sm:text-sm text-ink-soft truncate">{book.author}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-medium text-ink text-sm sm:text-base">{formatINR(price)}</p>
          {hasDiscount && (
            <p className="text-xs text-ink-soft line-through">{formatINR(book.price)}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 sm:mt-8 pt-4 border-t border-ink/10">
        <span className="text-ink-soft text-sm sm:text-base">Total</span>
        <span className="text-lg sm:text-xl font-medium text-ink">{formatINR(price)}</span>
      </div>

      {downloadUrl ? (
        <div className="mt-6 p-4 bg-forest/5 border border-forest/20 text-sm text-forest space-y-3">
          <p className="flex items-center gap-2 font-medium">
            <FiCheckCircle className="shrink-0" />
            Payment successful — your download should start automatically.
          </p>
          <a
            href={downloadUrl}
            className="btn-primary w-full flex items-center justify-center gap-2 !bg-forest !border-forest"
          >
            <FiDownload /> Download PDF again
          </a>
        </div>
      ) : (
        <>
          {/* Instructions, as requested: enter email -> pay -> auto-download */}
          <div className="mt-6 p-3 sm:p-4 bg-oxblood/5 border border-oxblood/15 text-xs sm:text-sm text-ink-soft space-y-1.5">
            <p className="font-medium text-ink">How it works</p>
            <p>1. Enter your email address below.</p>
            <p>2. Click "Pay Now" and complete the payment.</p>
            <p>3. Your PDF will start downloading automatically — no account needed.</p>
          </div>

          <div className="mt-5 sm:mt-6">
            <label htmlFor="checkout-email" className="block text-sm text-ink-soft mb-1.5">
              Email address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input
                id="checkout-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                className="w-full pl-10 pr-3 py-2.5 sm:py-3 border border-ink/15 bg-paper text-ink text-sm sm:text-base focus:outline-none focus:border-oxblood"
              />
            </div>
            {emailError && <p className="mt-1.5 text-xs text-red-600">{emailError}</p>}
            <p className="mt-1.5 text-xs text-ink-soft">We'll send your receipt here — no password or account required.</p>
          </div>

          <button
            onClick={handlePay}
            disabled={paying}
            className="btn-primary w-full mt-4 sm:mt-6 disabled:opacity-60"
          >
            {paying ? "Opening payment..." : `Pay Now — ${formatINR(price)}`}
          </button>
        </>
      )}

      <p className="flex items-center gap-2 justify-center mt-4 text-xs text-ink-soft">
        <FiShield />
        Payments are securely processed by Razorpay.
      </p>

      <p className="flex items-center gap-2 justify-center mt-2 text-xs sm:text-sm text-ink-soft text-center">
        <FiPhone className="shrink-0" />
        <span>
          For any query, contact{" "}
          <a href={`tel:${SUPPORT_PHONE_HREF}`} className="text-oxblood hover:underline font-medium">
            {SUPPORT_PHONE}
          </a>
        </span>
      </p>
    </div>
  );
}
