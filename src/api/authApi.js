import axiosInstance from "./axios";

export const registerApi = (data) => axiosInstance.post("/auth/register", data);

export const loginApi = (data) => axiosInstance.post("/auth/login", data);

export const googleAuthApi = (credential) => axiosInstance.post("/auth/google", { credential });

export const getProfileApi = () => axiosInstance.get("/auth/profile");

export const updateProfileApi = (data) => axiosInstance.put("/auth/profile", data);
