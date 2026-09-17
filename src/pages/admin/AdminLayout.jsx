import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/books", label: "Books" },
  { to: "/admin/orders", label: "Orders" },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-[180px_1fr] gap-8">
        <aside className="border-r border-ink/10 pr-6">
          <h2 className="font-display text-xl text-ink mb-4">Admin</h2>
          <nav className="flex md:flex-col gap-2 text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3 py-2 -mx-3 ${isActive ? "text-oxblood font-medium bg-oxblood/5" : "text-ink-soft hover:text-ink"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
