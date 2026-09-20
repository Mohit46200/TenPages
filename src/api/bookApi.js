import axiosInstance from "./axios";

// `params` can include: keyword, category, minPrice, maxPrice, sort, page, limit
export const getBooksApi = (params) => axiosInstance.get("/books", { params });

export const getBookByIdApi = (id) => axiosInstance.get(`/books/${id}`);

export const getCategoriesApi = () => axiosInstance.get("/books/categories");

// `formData` is a FormData instance so the cover image can be uploaded in the same request.
export const createBookApi = (formData) =>
  axiosInstance.post("/books", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateBookApi = (id, formData) =>
  axiosInstance.put(`/books/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteBookApi = (id) => axiosInstance.delete(`/books/${id}`);
