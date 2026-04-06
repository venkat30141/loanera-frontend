import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import Navbar from "../../components/common/Navbar";

import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";

import "./AnalystDashboard.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const AnalystDashboard = () => {
  const { user } = useAuth();

  const [summary, setSummary] = useState({});
  const [statusData, setStatusData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // LOAD DASHBOARD DATA
  // ===============================
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [summaryRes, statusRes, monthlyRes] = await Promise.all([
          axios.get("/api/analyst/dashboard/summary"),
          axios.get("/api/analyst/dashboard/loan-status"),
          axios.get("/api/analyst/dashboard/monthly-trends")
        ]);

        setSummary(summaryRes.data);
        setStatusData(statusRes.data);
        setMonthlyData(monthlyRes.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load analyst insights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // ===============================
  // LOADING & ERROR STATES
  // ===============================
  if (loading) {
    return <p className="loader">📊 Loading analyst insights...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  // ===============================
  // CHART DATA
  // ===============================
  const pieChartData = {
    labels: statusData.map(d => d.status),
    datasets: [
      {
        data: statusData.map(d => d.count),
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
          "#9C27B0",
          "#F44336"
        ]
      }
    ]
  };

  const lineChartData = {
    labels: monthlyData.map(d => `Month ${d.month}`),
    datasets: [
      {
        label: "Loans",
        data: monthlyData.map(d => d.loanCount),
        borderColor: "#2196F3",
        tension: 0.4
      }
    ]
  };

  // ===============================
  // UI
  // ===============================
  return (
    <>
      

      <div className="dashboard-container">
        <h2>📊 Analyst Dashboard</h2>
        <p className="subtitle">
          Welcome, <strong>{user?.name}</strong> — Real-time loan insights
        </p>

        {/* ================= KPI CARDS ================= */}
        <div className="dashboard-cards">
          <KpiCard title="Total Loans" value={summary?.totalLoans ?? 0} />
          <KpiCard title="Applied" value={summary?.appliedLoans ?? 0} />
          <KpiCard title="Approved" value={summary?.approvedLoans ?? 0} />
          <KpiCard title="Funded" value={summary?.fundedLoans ?? 0} />
          <KpiCard title="Active" value={summary?.activeLoans ?? 0} />
          <KpiCard title="Closed" value={summary?.closedLoans ?? 0} />
          <KpiCard
            title="Total Loan Amount"
            value={`₹ ${summary?.totalLoanAmount?.toLocaleString() ?? 0}`}
          />
          <KpiCard
            title="Avg Loan Amount"
            value={`₹ ${summary?.averageLoanAmount?.toLocaleString() ?? 0}`}
          />
        </div>

        {/* ================= CHARTS ================= */}
        <div className="chart-grid">
          <div className="chart-card">
            <h3>Loan Status Distribution</h3>
            <Pie data={pieChartData} />
          </div>

          <div className="chart-card">
            <h3>Monthly Loan Trends</h3>
            <Line data={lineChartData} />
          </div>
        </div>

        {/* ================= FUTURE AI INSIGHTS ================= */}
        <div className="ai-insights">
          <h3>🤖 AI-Powered Insights (Coming Soon)</h3>
          <ul>
            <li>High-risk loan prediction</li>
            <li>Default probability analysis</li>
            <li>Loan demand forecasting</li>
            <li>Lender profitability insights</li>
          </ul>
        </div>
      </div>
    </>
  );
};

// ===============================
// REUSABLE KPI CARD
// ===============================
const KpiCard = ({ title, value }) => (
  <div className="card">
    <h4>{title}</h4>
    <p className="kpi-value">{value}</p>
  </div>
);

export default AnalystDashboard;
