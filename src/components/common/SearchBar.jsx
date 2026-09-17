import { useState } from "react";
import { FiSearch } from "react-icons/fi";

/**
 * Controlled search input. Calls onSearch(keyword) on submit,
 * and optionally on every keystroke if `live` is true.
 */
export default function SearchBar({ onSearch, placeholder = "Search by title or author...", live = false, className = "" }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (live) onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="input-field pl-11"
        aria-label="Search books"
      />
      <button
        type="submit"
        className="absolute left-0 top-0 h-full px-3 flex items-center text-ink-soft"
        aria-label="Submit search"
      >
        <FiSearch size={18} />
      </button>
    </form>
  );
}
