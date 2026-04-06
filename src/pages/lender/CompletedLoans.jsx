import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import "./LenderPages.css"; // optional shared CSS

const CompletedLoans = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    try {
      const res = await axios.get(`/api/lender/my-loans/${user.id}`);
      const closedLoans = res.data.filter(
        (loan) => loan.status === "CLOSED"
      );
      setLoans(closedLoans);
    } catch (err) {
      console.error("Failed to load completed loans", err);
      alert("Failed to load completed loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchLoans();
  }, [user]);

  if (loading) return <p className="loader">Loading...</p>;

  return (
    <div className="page">
      <h2>Completed Loans</h2>

      {loans.length === 0 ? (
        <p>No completed loans</p>
      ) : (
        <div className="cards">
          {loans.map((loan) => (
            <div className="card" key={loan.id}>
              <h4>Loan #{loan.id}</h4>

              <p>
                <b>Amount:</b> ₹{loan.loanAmount}
              </p>

              <p>
                <b>Interest:</b> {loan.interestRate}%
              </p>

              <p>
                <b>Tenure:</b> {loan.tenureMonths} months
              </p>

              <span className="badge closed">CLOSED</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedLoans;
