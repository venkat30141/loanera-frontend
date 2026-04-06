import axios from "axios";

const BASE_URL = "http://localhost:8082/api/analyst";

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
