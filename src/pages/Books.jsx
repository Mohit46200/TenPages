import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/common/SearchBar";
import BookCard from "../components/common/BookCard";
import Loader from "../components/common/Loader";
import { getBooksApi, getCategoriesApi } from "../api/bookApi";
import Navbar from "../components/layout/Navbar";

export default function Books() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo] = useState({ page: 1, pages: 1, total: 0 });

  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page"); // reset pagination whenever a filter changes
    setSearchParams(next);
  };

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getBooksApi({ keyword, category, sort, page, limit: 12 });
      setBooks(data.books);
      setPageInfo({ page: data.page, pages: data.pages, total: data.total });
    } catch {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [keyword, category, sort, page]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    getCategoriesApi()
      .then((res) => setCategories(res.data.categories))
      .catch(() => setCategories([]));
  }, []);

  const goToPage = (p) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", p);
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

return (
  <div
    className="
      min-h-screen
      bg-[#F5F1E8]
    "
  >
    {/* Navbar */}
    <div
      className="
        sticky top-0 z-50
      "
    >
      <Navbar />
    </div>

    {/* Page Content */}
    <main
      className="
        max-w-7xl
        mx-auto px-4 md:px-8 py-10 md:py-14
      "
    >
      {/* Page Heading */}
      <div
        className="
          mb-8
        "
      >
        <h1
          className="
            text-3xl text-[#173B2F] md:text-4xl
            section-heading
          "
        >
          Browse the shelves
        </h1>

        <p
          className="
            mt-2
            text-sm text-[#173B2F]/55
          "
        >
          Find your next favorite book.
        </p>
      </div>

      {/* Filters */}
      <div
        className="
          flex flex-col md:flex-row items-stretch md:items-center
          mb-10 p-3
          bg-white/70
          rounded-2xl
          shadow-[0_4px_20px_rgba(23,59,47,0.06)]
          gap-3
        "
      >
        {/* Search */}
        <div
          className="
            md:flex-1
            w-full
          "
        >
          <SearchBar
            onSearch={(kw) => updateParam("keyword", kw)}
            placeholder="Search by title or author..."
            className="
              w-full
              rounded-xl
              border-none
              outline-none
              ring-0
              shadow-none
              
            "
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) =>
            updateParam("category", e.target.value)
          }
          className="
            w-full
            md:w-48
            h-11
            px-4
            rounded-xl
            bg-[#F5F1E8]
            text-[#173B2F]
            text-sm
            border-none
            outline-none
            ring-0
            shadow-none
            cursor-pointer
            appearance-none
            transition-all
            duration-200
            hover:bg-[#EEE8DC]
            focus:bg-white
            focus:ring-2
            focus:ring-[#173B2F]/10
          "
        >
          <option value="">All categories</option>

          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) =>
            updateParam("sort", e.target.value)
          }
          className="
            w-full
            md:w-48
            h-11
            px-4
            rounded-xl
            bg-[#F5F1E8]
            text-[#173B2F]
            text-sm
            border-none
            outline-none
            ring-0
            shadow-none
            cursor-pointer
            appearance-none
            transition-all
            duration-200
            hover:bg-[#EEE8DC]
            focus:bg-white
            focus:ring-2
            focus:ring-[#173B2F]/10
          "
        >
          <option value="">Newest first</option>

          <option value="price_asc">
            Price: low to high
          </option>

          <option value="price_desc">
            Price: high to low
          </option>

          <option value="rating">
            Top rated
          </option>
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <Loader label="Fetching books..." />
      ) : books.length === 0 ? (
        <div
          className="
            flex flex-col items-center justify-center
            py-24
            bg-white/60
            rounded-2xl
          "
        >
          <p
            className="
              text-[#173B2F]/60
            "
          >
            No books matched your search.
          </p>
        </div>
      ) : (
        <>
          {/* Result count */}
          <div
            className="
              flex items-center justify-between
              mb-5
            "
          >
            <p
              className="
                text-sm text-[#173B2F]/55
              "
            >
              {pageInfo.total} book(s) found
            </p>
          </div>

          {/* Book Grid */}
          <div
            className="
              grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              gap-5 md:gap-7
            "
          >
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
              />
            ))}
          </div>

          {/* Pagination */}
          {pageInfo.pages > 1 && (
            <div
              className="
                flex justify-center items-center
                mt-14
                gap-2
              "
            >
              {Array.from(
                { length: pageInfo.pages },
                (_, i) => i + 1
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`
                    w-10
                    h-10
                    rounded-full
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      p === pageInfo.page
                        ? `
                          bg-[#7A2929]
                          text-[#F5F1E8]
                          shadow-md
                        `
                        : `
                          bg-white
                          text-[#173B2F]/70
                          hover:bg-[#173B2F]
                          hover:text-white
                        `
                    }
                  `}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  </div>
);
}
