import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 text-center">
      <h1 className="font-display text-5xl text-ink">Page missing from the shelf</h1>
      <p className="text-ink-soft mt-3">We couldn't find what you were looking for.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        Back to the shop
      </Link>
    </div>
  );
}
