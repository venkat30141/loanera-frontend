import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import "./LenderDashboard.css";

const LenderDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    assigned: 0,
    active: 0,
    completed: 0,
    emiReceived: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`/api/lender/my-loans/${user.id}`);
      const loans = res.data;

      const assigned = loans.length;
      const active = loans.filter(l => l.status === "ACTIVE").length;
      const completed = loans.filter(l => l.status === "CLOSED").length;

      // simple EMI total mock (you can replace later with backend calc)
      let emiReceived = 0;
      loans.forEach(l => {
        if (l.status === "ACTIVE" || l.status === "CLOSED") {
          emiReceived += (l.loanAmount || 0);
        }
      });

      setStats({
        assigned,
        active,
        completed,
        emiReceived,
      });
    } catch (err) {
      console.error(
        "Failed to load lender stats",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchStats();
  }, [user]);

  if (loading) return <p className="loader">Loading...</p>;

  return (
    <div className="lender-dashboard">
      <h2>Lender Dashboard</h2>
      <p>Welcome, {user.name} 🏦</p>

      <div className="dashboard-cards">
        <div className="card" onClick={() => navigate("/lender/assigned-loans")}>
          <h3>Assigned Loans</h3>
          <p>{stats.assigned}</p>
        </div>

        <div className="card" onClick={() => navigate("/lender/active-investments")}>
          <h3>Active Investments</h3>
          <p>{stats.active}</p>
        </div>

        

        <div className="card" onClick={() => navigate("/lender/emi-received")}>
          <h3>EMI Received</h3>
          <p>₹{stats.emiReceived}</p>
        </div>
      </div>
    </div>
  );
};

export default LenderDashboard;
