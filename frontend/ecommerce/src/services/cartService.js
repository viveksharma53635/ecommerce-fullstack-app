import apiClient from "./apiClient";

// Add to cart
export const addToCart = (data) =>
  apiClient.post("/cart", data);

// Get cart
export const getCart = (userId) =>
  apiClient.get(`/cart/${userId}`);