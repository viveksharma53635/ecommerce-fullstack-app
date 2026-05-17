import apiClient from "./apiClient";

// Add Wishlist
export const addWishlist = (data) =>
  apiClient.post("/wishlist", data);

// Get Wishlist
export const getWishlist = (customerId) =>
  apiClient.get(`/wishlist/${customerId}`);

// Remove Wishlist
export const removeWishlist = (id) =>
  apiClient.delete(`/wishlist/${id}`);

// Move Wishlist → Cart
export const moveToCart = (wishlistId) =>
  apiClient.post(
    `/wishlist/${wishlistId}/move-to-cart`
  );