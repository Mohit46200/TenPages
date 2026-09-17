import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { updateProfileApi } from "../api/authApi";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    postalCode: user?.address?.postalCode || "",
    country: user?.address?.country || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await updateProfileApi({
        name: form.name,
        phone: form.phone,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          postalCode: form.postalCode,
          country: form.country,
        },
      });
      updateUser(data.user);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 md:px-8 py-12 md:py-16">
      <h1 className="section-heading mb-1">My account</h1>
      <p className="text-ink-soft text-sm mb-8">{user?.email}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-ink-soft mb-1 block">Full name</label>
          <input name="name" value={form.name} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="text-sm text-ink-soft mb-1 block">Phone number</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="text-sm text-ink-soft mb-1 block">Street address</label>
          <input name="street" value={form.street} onChange={handleChange} className="input-field" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink-soft mb-1 block">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="text-sm text-ink-soft mb-1 block">State</label>
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
        <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">
          {saving ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
