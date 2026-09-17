import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";
import { getBooksApi, deleteBookApi } from "../../api/bookApi";
import { formatINR } from "../../utils/format";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getBooksApi({ keyword, limit: 50 });
      setBooks(data.books);
    } catch {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (book) => {
    if (!window.confirm(`Delete "${book.title}"? This cannot be undone.`)) return;
    try {
      await deleteBookApi(book._id);
      toast.success("Book deleted");
      setBooks((prev) => prev.filter((b) => b._id !== book._id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete book");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-display text-2xl text-ink">Manage books</h1>
        <Link to="/admin/books/new" className="btn-primary text-sm">
          + Add book
        </Link>
      </div>

      <SearchBar
        onSearch={setKeyword}
        placeholder="Search books by title or author..."
        className="max-w-sm mb-6"
      />

      {loading ? (
        <Loader label="Loading books..." />
      ) : books.length === 0 ? (
        <p className="text-ink-soft">No books found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-ink/10 text-ink-soft">
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Author</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">PDF</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-b border-ink/5">
                  <td className="py-2.5 pr-4 max-w-[220px] truncate">{book.title}</td>
                  <td className="py-2.5 pr-4 text-ink-soft">{book.author}</td>
                  <td className="py-2.5 pr-4">{formatINR(book.price)}</td>
                  <td className="py-2.5 pr-4">
                    <span className={book.hasPdf ? "text-forest" : "text-oxblood"}>
                      {book.hasPdf ? "Attached" : "Missing"}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 space-x-3">
                    <Link to={`/admin/books/${book._id}/edit`} className="text-oxblood hover:underline">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(book)} className="text-ink-soft hover:text-oxblood">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
