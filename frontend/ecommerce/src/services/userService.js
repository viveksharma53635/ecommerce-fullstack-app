import apiClient from "./apiClient";

// Add Customer
export const createUser = (data) =>
  apiClient.post("/users", data);

// Get All Customers
export const getUsers = () =>
  apiClient.get("/users");

// Update Customer
export const updateUser = (id, data) =>
  apiClient.put(`/users/${id}`, data);

// Deactivate Customer
export const deactivateUser = (id) =>
  apiClient.patch(`/users/${id}/deactivate`);