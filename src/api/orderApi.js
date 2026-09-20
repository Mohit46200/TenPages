import axiosInstance from "./axios";

// Step 1 of "Buy Now": creates a Razorpay order + a matching local (unpaid)
// order, keyed only by the email the buyer types in — no login needed.
export const createRazorpayOrderApi = ({ bookId, email }) =>
  axiosInstance.post("/orders/razorpay/create", { bookId, email });

// Step 2: hand the backend Razorpay's response so it can verify the
// signature and unlock the PDF download.
export const verifyRazorpayPaymentApi = (payload) => axiosInstance.post("/orders/razorpay/verify", payload);

export const getOrderByIdApi = (id) => axiosInstance.get(`/orders/${id}`);

export const getAllOrdersApi = (params) => axiosInstance.get("/orders", { params });

// Builds the absolute, token-gated download URL returned after a verified
// payment. Hitting this directly (window.location / <a href>) makes the
// browser download the PDF via the server's Content-Disposition header.
export const getDownloadUrl = (relativeDownloadUrl) => `${axiosInstance.defaults.baseURL}${relativeDownloadUrl}`;

export const getAdminStatsApi = () => axiosInstance.get("/admin/stats");
