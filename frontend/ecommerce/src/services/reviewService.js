import apiClient from "./apiClient";

// Add Review
export const addReview = (data) =>
  apiClient.post("/reviews", data);

// Get Product Reviews
export const getProductReviews = (
  productId
) =>
  apiClient.get(
    `/reviews/product/${productId}`
  );

// Get All Reviews
export const getAllReviews = () =>
  apiClient.get("/reviews");

// Approve Review
export const approveReview = (id) =>
  apiClient.put(`/reviews/${id}/approve`);

// Update Review
export const updateReview = (
  id,
  data
) =>
  apiClient.put(`/reviews/${id}`, data);

// Delete Review
export const deleteReview = (id) =>
  apiClient.delete(`/reviews/${id}`);