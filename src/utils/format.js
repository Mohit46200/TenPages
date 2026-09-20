// Formats a number as Indian Rupees, e.g. 1299 -> "₹1,299", 499.5 -> "₹499.50"
export function formatINR(amount) {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}
