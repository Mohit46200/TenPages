// Razorpay's checkout script is already included in index.html, but we wait
// for it defensively (slow connections, ad blockers, etc.) before trying to
// use `window.Razorpay`.
let loadPromise = null;

export function loadRazorpayScript() {
  if (typeof window !== "undefined" && window.Razorpay) return Promise.resolve(true);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    const existing = document.querySelector('script[src*="checkout.razorpay.com"]');
    if (existing) {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return loadPromise;
}

/**
 * Opens the Razorpay checkout modal (works fine on mobile browsers/webviews).
 * @param {object} options - Razorpay checkout options (key, amount, order_id, handler, ...)
 * @returns {Promise<import("razorpay").Razorpay>} the opened Razorpay instance
 */
export async function openRazorpayCheckout(options) {
  const ready = await loadRazorpayScript();
  if (!ready || typeof window === "undefined" || !window.Razorpay) {
    throw new Error("Could not load the payment gateway. Check your connection and try again.");
  }
  const rzp = new window.Razorpay(options);
  if (options.onFailed) {
    rzp.on("payment.failed", options.onFailed);
  }
  rzp.open();
  return rzp;
}
