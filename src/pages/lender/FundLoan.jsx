import { useState } from "react";
import axios from "../../api/axios";

const FundLoan = () => {
  const [loanId, setLoanId] = useState("");

  const handleFund = async () => {
    try {
      await axios.put(`/api/lender/loan/${loanId}/fund`);
      alert("Loan funded successfully");
      setLoanId("");
    } catch (err) {
      alert("Funding failed");
    }
  };

  return (
    <div className="page">
      <h2>Fund a Loan</h2>

      <input
        type="number"
        placeholder="Enter Loan ID"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
      />

      <button onClick={handleFund}>Fund Loan</button>
    </div>
  );
};

export default FundLoan;
