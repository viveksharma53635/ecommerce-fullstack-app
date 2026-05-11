import apiClient from "./apiClient";

// Process Payment
export const processPayment = (data) =>
  apiClient.post("/payments", data);

// Get All Payments
export const getPayments = () =>
  apiClient.get("/payments");

// Refund Payment
export const refundPayment = (id) =>
  apiClient.patch(`/payments/${id}/refund`);