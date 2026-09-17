import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper-light/80 mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-display text-xl text-paper-light">Leafbound</h4>
          <p className="text-sm mt-2 text-paper-light/60">
            A small shop for readers who dog-ear their favourite pages.
          </p>
        </div>

        <div>
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

        <div>
          <h5 className="text-sm font-medium text-paper-light mb-3">Account</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/profile" className="hover:text-brass-light">
                My account
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-brass-light">
                Order history
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium text-paper-light mb-3">Support</h5>
          <ul className="space-y-2 text-sm">
            <li>adarshyadavmw2@gmail.com</li>
            <li>+91 9473768596</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper-light/10 text-center text-xs py-4 text-paper-light/50">
        © {new Date().getFullYear()} Leafbound Books. All rights reserved.
      </div>
    </footer>
  );
}
