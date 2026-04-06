import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import "./AssignedLoans.css";

const AssignedLoans = () => {
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLoans = async () => {
    try {
      const res = await axios.get(`/api/lender/my-loans/${user.id}`);
      setLoans(res.data);
    } catch (err) {
      alert("Failed to load assigned loans");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fundLoan = async (loanId) => {
    try {
      await axios.put(`/api/lender/loan/${loanId}/fund`);
      alert("Loan funded successfully!");
      fetchLoans();
    } catch (err) {
      alert("Funding failed");
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (user) fetchLoans();
  }, [user]);

  if (loading) return <p className="loader">Loading...</p>;

  return (
    <div className="assigned-loans-page">
      <h2>Assigned Loans</h2>

      {loans.length === 0 ? (
        <p>No loans assigned yet</p>
      ) : (
        <table className="loan-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Borrower</th>
              <th>Amount</th>
              <th>Interest</th>
              <th>Tenure</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.borrower?.user?.name || "N/A"}</td>
                <td>₹{loan.loanAmount}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.tenureMonths} months</td>
                <td>{loan.status}</td>
                <td>
                  {loan.status === "APPROVED" ? (
                    <button
                      className="fund-btn"
                      onClick={() => fundLoan(loan.id)}
                    >
                      Fund Loan
                    </button>
                  ) : (
                    <span className="badge">{loan.status}</span>
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

export default AssignedLoans;
