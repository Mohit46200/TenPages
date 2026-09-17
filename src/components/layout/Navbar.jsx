import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiMenu,
  FiX,
  FiArrowUpRight,
  FiShoppingBag,
  FiHome,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header
      className="
        sticky top-0 z-50
        w-full
        text-[#F5F1E8]
        bg-[#12161A]
      "
    >

      {/* ================= DESKTOP NAVBAR ================= */}
      <div
        className="
          hidden md:block
        "
      >
        <div
          className="
            w-full
            border-b border-white/10
          "
        >

          <div
            className="
              max-w-[1500px]
              mx-auto px-6 lg:px-10
            "
          >
            <div
              className="
                flex items-center
                h-[76px]
                gap-8
              "
            >

              {/* LOGO */}
              <Link
                to="/"
                className="
                  flex items-center
                  group gap-2 shrink-0
                "
              >
                <div
                  className="
                    flex items-center justify-center
                    w-9 h-9
                    text-[#173B2F] text-lg font-display
                    bg-[#F5F1E8]
                    rounded-full
                    transition-transform duration-300
                    group-hover:rotate-[-8deg]
                  "
                >
                  T
                </div>

                <div
                  className="
                    leading-none
                  "
                >
                  <div
                    className="
                      font-display text-[25px] tracking-[-0.04em]
                    "
                  >
                    TenPages
                  </div>

                  <div
                    className="
                      mt-1
                      text-[9px] text-[#F5F1E8]/45 tracking-[0.25em] uppercase
                    "
                  >
                    Books & Stories
                  </div>
                </div>
              </Link>

              <Link
                  to="/"
                  className="
                    flex items-center
                    px-4 py-2.5
                    text-sm text-[#F5F1E8]/70 hover:text-[#F5F1E8]
                    hover:bg-white/10
                    rounded-full
                    transition-all duration-200
                    gap-1.5
                  "
                >
                  <FiHome size={15} />
                    Home
                </Link>

              {/* MY ORDERS */}
              {isAuthenticated && (
                <Link
                  to="/orders"
                  className="
                    flex items-center
                    px-4 py-2.5
                    text-sm text-[#F5F1E8]/70 hover:text-[#F5F1E8]
                    hover:bg-white/10
                    rounded-full
                    transition-all duration-200
                    gap-1.5
                  "
                >
                  <FiShoppingBag size={15} />
                  My Orders
                </Link>
              )}

              {/* RIGHT ACTIONS */}
              <div
                className="
                  flex items-center
                  gap-2 shrink-0
                  ml-auto
                "
              >

                {/* ADMIN */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="
                      hidden lg:flex items-center
                      px-4 py-2.5
                      text-sm text-[#F5F1E8]/70 hover:text-[#F5F1E8]
                      hover:bg-white/10
                      rounded-full
                      transition-all duration-200
                      gap-1.5
                    "
                  >
                    Admin
                    <FiArrowUpRight size={14} />
                  </Link>
                )}

                {/* USER */}
                {isAuthenticated ? (
                  <div
                    className="
                      flex items-center
                      gap-1
                    "
                  >

                    <Link
                      to="/orders"
                      className="
                        flex items-center
                        px-3 py-2.5
                        hover:bg-white/10
                        rounded-full
                        transition-all duration-200
                        gap-2
                      "
                    >
                      <div
                        className="
                          flex items-center justify-center
                          w-8 h-8
                          text-[#173B2F] text-xs font-semibold
                          bg-[#D8B36A]
                          rounded-full
                        "
                      >
                        {user?.name?.charAt(0)?.toUpperCase() || (
                          <FiUser size={15} />
                        )}
                      </div>

                      <span
                        className="
                          max-w-[100px]
                          text-sm font-medium truncate
                        "
                      >
                        {user?.name?.split(" ")[0]}
                      </span>
                    </Link>

                    <button
                      onClick={logout}
                      className="
                        px-3 py-2
                        text-xs text-[#F5F1E8]/45 hover:text-[#F5F1E8]
                        rounded-full
                        transition-colors
                      "
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="
                      flex items-center justify-center
                      ml-2 px-5 py-2.5
                      text-[#173B2F] text-sm font-semibold
                      bg-[#F5F1E8] hover:bg-[#D8B36A]
                      rounded-full
                      transition-all duration-200
                      hover:-translate-y-0.5
                    "
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE NAVBAR ================= */}
      <div
        className="
          md:hidden
        "
      >

        <div
          className="
            flex items-center justify-between
            h-[68px]
            px-4
          "
        >

          {/* MOBILE LOGO */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <div
              className="
                flex items-center justify-center
                w-9 h-9
                text-[#173B2F] text-lg font-display
                bg-[#F5F1E8]
                rounded-full
              "
            >
              T
            </div>

            <div
              className="
                leading-none
              "
            >
              <div
                className="
                  font-display text-[23px] tracking-[-0.04em]
                "
              >
                TenPages
              </div>

              <div
                className="
                  mt-1
                  text-[8px] text-[#F5F1E8]/40 tracking-[0.2em] uppercase
                "
              >
                Books & Stories
              </div>
            </div>
          </Link>

          {/* MOBILE ACTIONS */}
          <div
            className="
              flex items-center
              gap-2
            "
          >

            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="
                w-10 h-10
                rounded-full
                flex items-center justify-center
                bg-white/[0.05]
                border border-white/10
                hover:bg-white/10
                transition-all
              "
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`
            overflow-hidden
            transition-all duration-300 ease-out
            ${
              open
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div
            className="
              px-4 pb-5 pt-2
              bg-[#123127]
              border-t border-white/10
            "
          >

            {/* MENU LINKS */}
            <div
              className="
                space-y-1
              "
            >

              {isAuthenticated && (
                <Link
                  to="/orders"
                  onClick={() => setOpen(false)}
                  className="
                    flex items-center justify-between
                    px-4 py-3.5
                    rounded-xl
                    text-sm
                    hover:bg-white/10
                    transition-all
                  "
                >
                  <span className="flex items-center gap-2">
                    <FiShoppingBag size={16} className="opacity-70" />
                    My Orders
                  </span>
                  <FiArrowUpRight
                    size={16}
                    className="
                      opacity-40
                    "
                    /
                  >
                </Link>
              )}

              <Link
                to="/books"
                onClick={() => setOpen(false)}
                className="
                  flex items-center justify-between
                  px-4 py-3.5
                  rounded-xl
                  text-sm
                  hover:bg-white/10
                  transition-all
                "
              >
                <span>Browse Books</span>
                <FiArrowUpRight
                  size={16}
                  className="
                    opacity-40
                  "
                  /
                >
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="
                    flex items-center justify-between
                    px-4 py-3.5
                    rounded-xl
                    text-sm
                    hover:bg-white/10
                    transition-all
                  "
                >
                  <span>Admin Dashboard</span>
                  <FiArrowUpRight
                    size={16}
                    className="
                      opacity-40
                    "
                    /
                  >
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="
                      flex items-center gap-3
                      px-4 py-3.5
                      rounded-xl
                      text-sm
                      hover:bg-white/10
                      transition-all
                    "
                  >
                    <div
                      className="
                        flex items-center justify-center
                        w-8 h-8
                        text-[#173B2F] text-xs font-semibold
                        bg-[#D8B36A]
                        rounded-full
                      "
                    >
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <div
                        className="
                          font-medium
                        "
                      >
                        {user?.name || "My account"}
                      </div>

                      <div
                        className="
                          text-xs text-[#F5F1E8]/40
                        "
                      >
                        View profile
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="
                      w-full
                      text-left
                      px-4 py-3.5
                      rounded-xl
                      text-sm
                      text-[#F5F1E8]/60
                      hover:text-[#F5F1E8]
                      hover:bg-white/10
                      transition-all
                    "
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="
                    flex items-center justify-center
                    mt-2
                    px-4 py-3
                    rounded-full
                    bg-[#F5F1E8]
                    text-[#173B2F]
                    text-sm font-semibold
                    hover:bg-[#D8B36A]
                    transition-all
                  "
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}