import apiClient from "./apiClient";

// Place Order
export const placeOrder = (data) =>
  apiClient.post("/orders", data);

// Get Orders
export const getOrders = () =>
  apiClient.get("/orders");

// Update Status
export const updateOrderStatus = (id, status) =>
  apiClient.put(`/orders/${id}/status?status=${status}`);

// Cancel Order
export const cancelOrder = (id) =>
  apiClient.patch(`/orders/${id}/cancel`);