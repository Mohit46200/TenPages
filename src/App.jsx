import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import AdminRoute from "./components/common/AdminRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBooks from "./pages/admin/AdminBooks";
import AddEditBook from "./pages/admin/AddEditBook";
import AdminOrders from "./pages/admin/AdminOrders";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* No public Navbar — there's no customer account area to link to.
          Admins sign in at /admin/login, reachable via the small link in
          the footer. */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />

          {/* Guest checkout — just an email address, no login required. */}
          <Route path="/checkout/:bookId" element={<Checkout />} />

          {/* Admin-only sign in, kept off the public /login path. */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="books/new" element={<AddEditBook />} />
            <Route path="books/:id/edit" element={<AddEditBook />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
