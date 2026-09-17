import axiosInstance from "./axios";

// Step 1 of "Buy Now": creates a Cashfree order + a matching local (unpaid) order.
export const createCashfreeOrderApi = (bookId) =>
  axiosInstance.post("/orders/cashfree/create", { bookId });

// Step 2: ask the backend to confirm the order's status with Cashfree, unlocking the PDF.
export const verifyCashfreePaymentApi = (payload) =>
  axiosInstance.post("/orders/cashfree/verify", payload);

export const getMyOrdersApi = () => axiosInstance.get("/orders/my");

export const getOrderByIdApi = (id) => axiosInstance.get(`/orders/${id}`);

export const getAllOrdersApi = (params) => axiosInstance.get("/orders", { params });

// Downloads the purchased PDF as a blob so it can be saved via a synthetic <a download>.
export const downloadBookPdfApi = (orderId, bookId) =>
  axiosInstance.get(`/orders/${orderId}/download/${bookId}`, { responseType: "blob" });

export const getAdminStatsApi = () => axiosInstance.get("/admin/stats");
