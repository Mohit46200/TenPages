import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { loginApi, googleAuthApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginApi(form);
      login(data.token, data.user);
      toast.success(`Welcome back, ${data.user.name.split(" ")[0]}`);
      navigate(data.user.role === "admin" ? "/admin" : redirectTo, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await googleAuthApi(credentialResponse.credential);
      login(data.token, data.user);
      toast.success(`Welcome, ${data.user.name.split(" ")[0]}`);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Google sign-in failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 md:py-24">
      <h1 className="font-display text-3xl text-ink mb-1">Welcome back</h1>
      <p className="text-ink-soft text-sm mb-8">Sign in to pick up where you left off.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-ink-soft mb-1 block">Email</label>
          <input
            type="email"
            name="email"
            required
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
            value={form.password}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px bg-ink/10 flex-1" />
        <span className="text-xs text-ink-soft">or</span>
        <div className="h-px bg-ink/10 flex-1" />
      </div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google sign-in failed")}
          text="signin_with"
          shape="rectangular"
        />
      </div>

      <p className="text-sm text-ink-soft mt-8 text-center">
        New here?{" "}
        <Link to="/register" className="text-oxblood hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
