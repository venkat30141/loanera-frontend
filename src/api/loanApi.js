import api from "./axios";

export const applyLoan = (data) => api.post("/borrower/loan", data);
export const getBorrowerLoans = (id) => api.get(`/borrower/${id}/loans`);
export const getLenderLoans = (id) => api.get(`/lender/${id}/loans`);
