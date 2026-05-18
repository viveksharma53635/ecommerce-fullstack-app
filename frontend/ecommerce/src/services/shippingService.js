import apiClient from "./apiClient";

// Create Shipping
export const createShipping = (data) =>
  apiClient.post("/shipping", data);

// Get All Shipping
export const getAllShipping = () =>
  apiClient.get("/shipping");

// Track Shipment
export const trackShipment = (trackingNumber) =>
  apiClient.get(
    `/shipping/track/${trackingNumber}`
  );

// Update Shipping Status
export const updateShippingStatus = (
  id,
  status
) =>
  apiClient.put(
    `/shipping/${id}/status?status=${status}`
  );