import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

// Admin-only sign in. There is no customer login — books are bought as a
// guest via email at checkout, with no account or password involved.
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginApi(form);
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.name.split(" ")[0]}`);
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 md:py-24">
      <h1 className="font-display text-2xl sm:text-3xl text-ink mb-1">Admin sign in</h1>
      <p className="text-ink-soft text-sm mb-8">This sign-in is for store administrators only.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-ink-soft mb-1 block">Email</label>
          <input
            type="email"
            name="email"
            required
            autoComplete="username"
            value={form.email}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="text-sm text-ink-soft mb-1 block">Password</label>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
