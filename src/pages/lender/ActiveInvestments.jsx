import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import "./ActiveInvestments.css";

const ActiveInvestments = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    const res = await axios.get(`/api/lender/my-loans/${user.id}`);
    setLoans(res.data.filter(l => l.status === "ACTIVE"));
  };

  useEffect(() => {
    if (user) fetchLoans();
  }, [user]);

  return (
    <div className="page">
      <h2>Active Investments</h2>

      {loans.length === 0 ? (
        <p>No active investments</p>
      ) : (
        <div className="cards">
          {loans.map((loan) => (
            <div className="investment-card" key={loan.id}>
              
              {/* Header */}
              <div className="card-header">
                <h3>Loan #{loan.id}</h3>
                <span className="status-badge">ACTIVE</span>
              </div>

              <div className="divider" />

              {/* Details */}
              <div className="card-row">
                <span className="label">Loan Amount</span>
                <span className="value">₹ {loan.loanAmount}</span>
              </div>

              <div className="card-row">
                <span className="label">Interest Rate</span>
                <span className="value">{loan.interestRate}%</span>
              </div>

              <div className="card-row">
                <span className="label">Tenure</span>
                <span className="value">{loan.tenureMonths} months</span>
              </div>

              {loan.borrower && (
                <div className="card-row">
                  <span className="label">Borrower</span>
                  <span className="value">
                    {loan.borrower.user?.name || "N/A"}
                  </span>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveInvestments;
