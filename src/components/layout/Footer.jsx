import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper-light/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="col-span-2 md:col-span-1 min-w-0">
          <h4 className="font-display text-xl text-paper-light">Leafbound</h4>
          <p className="text-sm mt-2 text-paper-light/60">
            A small shop for readers who dog-ear their favourite pages.
          </p>
        </div>

        <div className="min-w-0">
          <h5 className="text-sm font-medium text-paper-light mb-3">Shop</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/books" className="hover:text-brass-light">
                All books
              </Link>
            </li>
            <li>
              <Link to="/books?sort=rating" className="hover:text-brass-light">
                Top rated
              </Link>
            </li>
          </ul>
        </div>

        <div className="min-w-0">
          <h5 className="text-sm font-medium text-paper-light mb-3">Support</h5>
          <ul className="space-y-2 text-sm">
            <li className="break-words">adarshyadavmw2@gmail.com</li>
            <li>
              <a href="tel:+919473768596" className="hover:text-brass-light">
                +91 9473768596
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper-light/10 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 max-w-7xl mx-auto px-4 md:px-8 text-center text-xs py-4 text-paper-light/50">
        <span>© {new Date().getFullYear()} Leafbound Books. All rights reserved.</span>
        <Link to="/admin/login" className="text-paper-light/30 hover:text-paper-light/60">
          Admin sign in
        </Link>
      </div>
    </footer>
  );
}