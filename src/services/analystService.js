import axios from "axios";

const BASE_URL = "https://loanera-backend-production.up.railway.app/api/analyst";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

export const fetchAnalystSummary = () =>
  axios.get(`${BASE_URL}/dashboard/summary`, getAuthHeaders());

export const fetchLoanStatusChart = () =>
  axios.get(`${BASE_URL}/dashboard/loan-status`, getAuthHeaders());

export const fetchMonthlyLoanTrends = () =>
  axios.get(`${BASE_URL}/dashboard/monthly-trends`, getAuthHeaders());
