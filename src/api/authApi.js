import axiosInstance from "./axios";

// Admin-only — there is no public registration and no Google sign-in.
export const loginApi = (data) => axiosInstance.post("/auth/login", data);

export const getProfileApi = () => axiosInstance.get("/auth/profile");

export const updateProfileApi = (data) => axiosInstance.put("/auth/profile", data);
