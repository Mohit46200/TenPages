import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiStar, FiDownload } from "react-icons/fi";
import { getBookByIdApi } from "../api/bookApi";
import Loader from "../components/common/Loader";
import { formatINR } from "../utils/format";

const FALLBACK_COVER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg width='300' height='420' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23DED2B3'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='18' fill='%234A443B' text-anchor='middle'%3ENo cover%3C/text%3E%3C/svg%3E";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiOrigin = (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "");

  useEffect(() => {
    setLoading(true);
    getBookByIdApi(id)
      .then((res) => setBook(res.data.book))
      .catch(() => setBook(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader label="Fetching book..." />;

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-ink-soft">Book not found.</p>
        <Link to="/books" className="text-oxblood hover:underline">
          Back to browsing
        </Link>
      </div>
    );
  }

  const coverSrc = book.image
    ? book.image.startsWith("http")
      ? book.image
      : `${apiOrigin}${book.image}`
    : FALLBACK_COVER;

  const hasDiscount = book.discountPrice > 0 && book.discountPrice < book.price;

  // No account needed to buy — checkout only asks for an email address.
  const handleBuyNow = () => navigate(`/checkout/${book._id}`);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-10">
      <div className="bg-paper-dark aspect-[3/4] max-w-sm mx-auto md:mx-0 w-full">
        <img src={coverSrc} alt={`Cover of ${book.title}`} className="w-full h-full object-cover" />
      </div>

      <div>
        <p className="text-sm text-oxblood uppercase tracking-wide">{book.category}</p>
        <h1 className="font-display text-3xl md:text-4xl text-ink mt-1">{book.title}</h1>
        <p className="text-ink-soft mt-1">by {book.author}</p>

        {book.rating > 0 && (
          <div className="flex items-center gap-1 mt-3 text-brass text-sm">
            <FiStar className="fill-brass" />
            <span>{book.rating.toFixed(1)}</span>
            <span className="text-ink-soft">({book.numReviews} reviews)</span>
          </div>
        )}

        <div className="flex items-baseline gap-3 mt-5">
          <span className="text-2xl font-medium text-ink">
            {formatINR(hasDiscount ? book.discountPrice : book.price)}
          </span>
          {hasDiscount && <span className="text-ink-soft line-through">{formatINR(book.price)}</span>}
        </div>

        <div className="flex items-center gap-2 mt-2 text-sm text-forest">
          <FiDownload />
          <span>Delivered as a PDF — instant download after payment</span>
        </div>

        <p className="text-ink-soft mt-6 leading-relaxed whitespace-pre-line">{book.description}</p>

        <button onClick={handleBuyNow} className="btn-primary w-full mt-8">
          Buy now — {formatINR(hasDiscount ? book.discountPrice : book.price)}
        </button>
      </div>
    </div>
  );
}
