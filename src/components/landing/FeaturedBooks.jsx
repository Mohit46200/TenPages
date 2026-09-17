import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../../hooks/useScrollReveal";
import BookCard from "../common/BookCard";
import { getBooksApi } from "../../api/bookApi";

export default function FeaturedBooks() {
  const sectionRef = useScrollReveal({ y: 30 });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooksApi({ sort: "rating", limit: 4 })
      .then((res) => setBooks(res.data.books))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && books.length === 0) return null;

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="flex items-end justify-between mb-8">
        <h2 className="section-heading">Currently on the front table</h2>
        <Link to="/books" className="text-sm text-oxblood hover:underline hidden sm:inline">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-paper-dark animate-pulse" />
            ))
          : books.map((book) => <BookCard key={book._id} book={book} />)}
      </div>
    </section>
  );
}
