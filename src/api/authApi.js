import api from "./axios";

export const loginApi = (data) => api.post("/login", data);

export const registerApi = (data) => api.post("/register", data);
