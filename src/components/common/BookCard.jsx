import { Link, useNavigate } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { formatINR } from "../../utils/format";

const FALLBACK_COVER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg width='300' height='420' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23DED2B3'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='18' fill='%234A443B' text-anchor='middle'%3ENo cover%3C/text%3E%3C/svg%3E";

export default function BookCard({ book }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const apiOrigin = (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "");
  const coverSrc = book.image
    ? book.image.startsWith("http")
      ? book.image
      : `${apiOrigin}${book.image}`
    : FALLBACK_COVER;

  const hasDiscount = book.discountPrice > 0 && book.discountPrice < book.price;

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate(`/checkout/${book._id}`);
    } else {
      navigate("/login", { state: { from: { pathname: `/checkout/${book._id}` } } });
    }
  };

  return (
    <div className="group flex flex-col">
      <Link to={`/books/${book._id}`} className="block overflow-hidden bg-paper-dark aspect-[3/4]">
        <img
          src={coverSrc}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      <div className="pt-3 flex-1 flex flex-col">
        <Link to={`/books/${book._id}`}>
          <h3 className="font-display text-lg leading-snug text-ink group-hover:text-oxblood transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-ink-soft mt-0.5">{book.author}</p>

        {book.rating > 0 && (
          <div className="flex items-center gap-1 mt-1 text-brass text-xs">
            <FiStar className="fill-brass" />
            <span>{book.rating.toFixed(1)}</span>
            <span className="text-ink-soft">({book.numReviews})</span>
          </div>
        )}

        <div className="mt-2 flex items-center gap-2">
          <span className="font-medium text-ink">
            {formatINR(hasDiscount ? book.discountPrice : book.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-ink-soft line-through">{formatINR(book.price)}</span>
          )}
        </div>

        <button onClick={handleBuyNow} className="mt-3 btn-secondary text-xs py-2">
          Buy now
        </button>
      </div>
    </div>
  );
}
