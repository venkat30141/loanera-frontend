import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./ManageLoans.css";

const ManageLoans = () => {
  const [activeTab, setActiveTab] = useState("APPLIED");
  const [appliedLoans, setAppliedLoans] = useState([]);
  const [approvedLoans, setApprovedLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Assign lender state
  const [assigningLoanId, setAssigningLoanId] = useState(null);
  const [lenderId, setLenderId] = useState("");

  // =========================
  // FETCH APPLIED LOANS
  // =========================
  const fetchAppliedLoans = async () => {
    const res = await axios.get("/api/admin/loans/applied");
    setAppliedLoans(res.data);
  };

  // =========================
  // FETCH APPROVED LOANS
  // =========================
  const fetchApprovedLoans = async () => {
    const res = await axios.get("/api/admin/loans/approved");
    setApprovedLoans(res.data);
  };

  // =========================
  // LOAD ALL DATA
  // =========================
  const loadData = async () => {
    try {
      setLoading(true);
      await fetchAppliedLoans();
      await fetchApprovedLoans();
    } catch (err) {
      alert("Failed to load loans");
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // APPROVE LOAN
  // =========================
  const approveLoan = async (loanId) => {
    try {
      await axios.post(`/api/admin/approve/${loanId}`);
      alert("Loan approved successfully");
      loadData(); // moves loan to Approved tab
    } catch (err) {
      alert("Approval failed");
      console.error(err.response?.data || err.message);
    }
  };

  // =========================
  // ASSIGN LENDER
  // =========================
  const assignLender = async (loanId) => {
    if (!lenderId) {
      alert("Please enter lender ID");
      return;
    }

    try {
      await axios.post(
        `/api/admin/assign-lender/${loanId}/${lenderId}`
      );
      alert("Lender assigned successfully");
      setAssigningLoanId(null);
      setLenderId("");
      loadData();
    } catch (err) {
      alert("Assignment failed");
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p className="loader">Loading...</p>;

  return (
    <div className="manage-loans">
      <h2>Admin – Loan Management</h2>

      {/* ================= TABS ================= */}
      <div className="tabs">
        <button
          className={activeTab === "APPLIED" ? "active" : ""}
          onClick={() => setActiveTab("APPLIED")}
        >
          Applied Loans
        </button>

        <button
          className={activeTab === "APPROVED" ? "active" : ""}
          onClick={() => setActiveTab("APPROVED")}
        >
          Approved Loans
        </button>
      </div>

      {/* ================= APPLIED LOANS ================= */}
      {activeTab === "APPLIED" && (
        <>
          {appliedLoans.length === 0 ? (
            <p>No applied loans 🎉</p>
          ) : (
            <table className="loan-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Borrower</th>
                  <th>Amount</th>
                  <th>Interest</th>
                  <th>Tenure</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appliedLoans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>{loan.borrower?.user?.name || "N/A"}</td>
                    <td>₹{loan.loanAmount}</td>
                    <td>{loan.interestRate}%</td>
                    <td>{loan.tenureMonths} months</td>
                    <td>
                      <button
                        className="approve-btn"
                        onClick={() => approveLoan(loan.id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* ================= APPROVED LOANS ================= */}
      {activeTab === "APPROVED" && (
        <>
          {approvedLoans.length === 0 ? (
            <p>No approved loans</p>
          ) : (
            <table className="loan-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Borrower</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Lender</th>
                </tr>
              </thead>
              <tbody>
                {approvedLoans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>{loan.borrower?.user?.name || "N/A"}</td>
                    <td>₹{loan.loanAmount}</td>
                    <td>{loan.status}</td>
                    <td>
                      {loan.lender ? (
                        <span>Assigned (ID: {loan.lender.id})</span>
                      ) : assigningLoanId === loan.id ? (
                        <div className="assign-box">
                          <input
                            type="number"
                            placeholder="Lender ID"
                            value={lenderId}
                            onChange={(e) =>
                              setLenderId(e.target.value)}
                          />
                          <button
                            className="assign-btn"
                            onClick={() => assignLender(loan.id)}
                          >
                            Assign
                          </button>
                          <button
                            className="cancel-btn"
                            onClick={() => {
                              setAssigningLoanId(null);
                              setLenderId("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="assign-lender-btn"
                          onClick={() => setAssigningLoanId(loan.id)}
                        >
                          Assign Lender
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ManageLoans;
