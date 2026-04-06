import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import "./MyLoans.css";

const MyLoans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await axios.get(`/api/borrower/my-loans/${user.id}`);
        setLoans(res.data);
      } catch (err) {
        console.error("Failed to fetch loans", err);
        alert("Failed to load loans");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchLoans();
  }, [user]);

  if (loading) return <p className="loader">Loading...</p>;

  // =========================
  // FILTER LOGIC
  // =========================
  const filteredLoans =
    activeTab === "ALL"
      ? loans
      : loans.filter((loan) => loan.status === activeTab);

  return (
    <div className="loans-container">
      <h2>My Loans</h2>

      {/* ================= TABS ================= */}
      <div className="loan-tabs">
        {["ALL", "APPLIED", "APPROVED", "ACTIVE", "CLOSED"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      {filteredLoans.length === 0 ? (
        <p>No {activeTab.toLowerCase()} loans found.</p>
      ) : (
        <table className="loans-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Amount</th>
              <th>Interest %</th>
              <th>Tenure</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>₹ {loan.loanAmount}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.tenureMonths} months</td>

                <td>
                  <span className={`status ${loan.status.toLowerCase()}`}>
                    {loan.status}
                  </span>
                </td>

                <td>
                  {loan.appliedDate
                    ? new Date(loan.appliedDate).toLocaleString()
                    : "—"}
                </td>

                <td>
                  {loan.status === "ACTIVE" || loan.status === "CLOSED" ? (
                    <button
                      className="btn-emi"
                      onClick={() =>
                        navigate(`/borrower/emi/${loan.id}`)
                      }
                    >
                      View EMI
                    </button>
                  ) : (
                    <span className="muted">Not Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyLoans;
