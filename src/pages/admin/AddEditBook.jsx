import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getBookByIdApi, createBookApi, updateBookApi } from "../../api/bookApi";

const emptyForm = {
  title: "",
  author: "",
  description: "",
  price: "",
  discountPrice: "",
  category: "",
  isbn: "",
};

export default function AddEditBook() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [hasExistingPdf, setHasExistingPdf] = useState(false);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const apiOrigin = (import.meta.env.VITE_API_URL || "").replace(/\/api\/?$/, "");

  useEffect(() => {
    if (!isEdit) return;
    getBookByIdApi(id)
      .then((res) => {
        const b = res.data.book;
        setForm({
          title: b.title,
          author: b.author,
          description: b.description,
          price: b.price,
          discountPrice: b.discountPrice || "",
          category: b.category,
          isbn: b.isbn,
        });
        setHasExistingPdf(Boolean(b.hasPdf));
        if (b.image) setPreview(b.image.startsWith("http") ? b.image : `${apiOrigin}${b.image}`);
      })
      .catch(() => toast.error("Could not load book"))
      .finally(() => setLoading(false));
  }, [id, isEdit, apiOrigin]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPdfFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEdit && !pdfFile) {
      toast.error("Please attach the book's PDF file");
      return;
    }

    setSaving(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append("image", imageFile);
    if (pdfFile) formData.append("pdf", pdfFile);

    try {
      if (isEdit) {
        await updateBookApi(id, formData);
        toast.success("Book updated");
      } else {
        await createBookApi(formData);
        toast.success("Book added");
      }
      navigate("/admin/books");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save book");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-ink-soft">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl text-ink mb-6">{isEdit ? "Edit book" : "Add a new book"}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-sm text-ink-soft mb-1 block">Title</label>
            <input name="title" required value={form.title} onChange={handleChange} className="input-field" />
          </div>
          <div className="col-span-2">
            <label className="text-sm text-ink-soft mb-1 block">Author</label>
            <input name="author" required value={form.author} onChange={handleChange} className="input-field" />
          </div>
          <div className="col-span-2">
            <label className="text-sm text-ink-soft mb-1 block">Description</label>
            <textarea
              name="description"
              required
              rows={5}
              value={form.description}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">Price (₹)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="price"
              required
              value={form.price}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">Discount price (₹, optional)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="discountPrice"
              value={form.discountPrice}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">Category</label>
            <input name="category" value={form.category} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">ISBN</label>
            <input name="isbn" value={form.isbn} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">Cover image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">
              Book PDF {!isEdit && <span className="text-oxblood">*</span>}
            </label>
            <input type="file" accept="application/pdf" onChange={handlePdfChange} className="text-sm" />
            {isEdit && (
              <p className="text-xs text-ink-soft mt-1">
                {pdfFile
                  ? `New file selected: ${pdfFile.name}`
                  : hasExistingPdf
                  ? "A PDF is already attached. Choose a new file only to replace it."
                  : "No PDF attached yet — please upload one."}
              </p>
            )}
          </div>
        </div>

        {preview && (
          <img src={preview} alt="Cover preview" className="w-28 h-40 object-cover bg-paper-dark" />
        )}

        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving..." : isEdit ? "Save changes" : "Add book"}
        </button>
      </form>
    </div>
  );
}
