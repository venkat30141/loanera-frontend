import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import Navbar from "../../components/common/Navbar";
import "./BorrowerDashboard.css";

const BorrowerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        await axios.get(`/api/borrower/profile/${user.id}`);
        setProfileExists(true);
      } catch {
        setProfileExists(false);
      } finally {
        setLoading(false);
      }
    };

    if (user) checkProfile();
  }, [user]);

  if (loading) return <p className="loader">Loading...</p>;

  return (
    <>
      

      <div className="dashboard-container">
        <h2>Borrower Dashboard</h2>
        <p>Welcome, {user.name} 👋</p>

        {!profileExists && (
          <div className="alert warning">
            ⚠️ Please complete your borrower profile to apply for loans.
            <button onClick={() => navigate("/borrower/profile")}>
              Create Profile
            </button>
          </div>
        )}

        <div className="dashboard-cards">
          <div
            className={`card ${!profileExists ? "disabled" : ""}`}
            onClick={() => profileExists && navigate("/borrower/apply-loan")}
          >
            <h3>Apply Loan</h3>
            <p>Request a new loan</p>
          </div>

          <div
            className="card"
            onClick={() => navigate("/borrower/my-loans")}
          >
            <h3>My Loans</h3>
            <p>View your loans</p>
          </div>
        </div>
      </div>

      {/* 🔥 Floating Chatbot Button */}
      <button
        className="chat-float-btn"
        onClick={() => window.open("http://127.0.0.1:5000", "_blank")}
      >
        🤖Ask Finova
      </button>
    </>
  );
};

export default BorrowerDashboard;