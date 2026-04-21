import apiClient from "./apiClient";

const API = "/products";

export const getProducts = () => apiClient.get(API);

export const addProduct = (data, categoryId) =>
  apiClient.post(`${API}?categoryId=${categoryId}`, data);

export const updateProduct = (id, data) =>
  apiClient.put(`${API}/${id}`, data);

export const deactivateProduct = (id) =>
  apiClient.patch(`${API}/${id}/deactivate`);
