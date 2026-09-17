// Loads Cashfree's checkout SDK on demand. It's already included via a
// <script> tag in index.html for fast first paint, but this fallback makes
// the payment flow resilient if that tag is ever removed or hasn't
// finished loading yet.
export function loadCashfreeScript() {
  return new Promise((resolve) => {
    if (window.Cashfree) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// One shared instance, initialized in whichever mode the backend is running
// in (sandbox while testing, production once live).
export function getCashfreeInstance() {
  const mode = import.meta.env.VITE_CASHFREE_ENV === "production" ? "production" : "sandbox";
  return window.Cashfree({ mode });
}
