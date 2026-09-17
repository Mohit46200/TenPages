import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { registerApi, googleAuthApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { data } = await registerApi({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
        },
      });
      login(data.token, data.user);
      toast.success("Account created — welcome!");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await googleAuthApi(credentialResponse.credential);
      login(data.token, data.user);
      toast.success(`Welcome, ${data.user.name.split(" ")[0]}`);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Google sign-up failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16 md:py-24">
      <h1 className="font-display text-3xl text-ink mb-1">Create your account</h1>
      <p className="text-ink-soft text-sm mb-8">
        Address and phone help us ship your orders — you can edit them later.
      </p>

      <div className="flex justify-center mb-6">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google sign-up failed")}
          text="signup_with"
          shape="rectangular"
        />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-px bg-ink/10 flex-1" />
        <span className="text-xs text-ink-soft">or sign up with email</span>
        <div className="h-px bg-ink/10 flex-1" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-sm text-ink-soft mb-1 block">Full name</label>
            <input name="name" required value={form.name} onChange={handleChange} className="input-field" />
          </div>
          <div className="col-span-2">
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
              minLength={6}
              value={form.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm text-ink-soft mb-1 block">Phone number</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="input-field" />
          </div>
          <div className="col-span-2">
            <label className="text-sm text-ink-soft mb-1 block">Street address</label>
            <input name="street" value={form.street} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">State / province</label>
            <input name="state" value={form.state} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">Postal code</label>
            <input name="postalCode" value={form.postalCode} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">Country</label>
            <input name="country" value={form.country} onChange={handleChange} className="input-field" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-sm text-ink-soft mt-8 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-oxblood hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
