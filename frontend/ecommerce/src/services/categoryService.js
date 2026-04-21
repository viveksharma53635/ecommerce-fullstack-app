import apiClient from "./apiClient";

const API = "/categories";

export const getCategories = () => apiClient.get(API);
