import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ApplyLoan.css";

const ApplyLoan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [borrowerId, setBorrowerId] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    interestRate: "",
    tenureMonths: "",
  });

  const [emiPreview, setEmiPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 STEP 1 — FETCH BORROWER PROFILE FIRST
  useEffect(() => {
    const fetchBorrowerProfile = async () => {
      try {
        const res = await axios.get(`/api/borrower/profile/${user.id}`);
        setBorrowerId(res.data.id);   // 👈 VERY IMPORTANT
      } catch (err) {
        alert("Please create borrower profile first");
        navigate("/borrower/profile");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBorrowerProfile();
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 EMI PREVIEW (FRONTEND ONLY)
  const previewEmi = () => {
    const P = parseFloat(form.amount);
    const r = parseFloat(form.interestRate) / 12 / 100;
    const n = parseInt(form.tenureMonths);

    const emi =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    const totalPayable = emi * n;
    const totalInterest = totalPayable - P;

    setEmiPreview({
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayable: totalPayable.toFixed(2),
    });
  };

  // 🔥 STEP 2 — APPLY LOAN (SEND BORROWER ID)
  const handleApplyLoan = async () => {
    try {
      const payload = {
        borrowerId: borrowerId,                // ✅ MUST BE borrowerId
        amount: parseFloat(form.amount),
        interestRate: parseFloat(form.interestRate),
        tenureMonths: parseInt(form.tenureMonths),
      };

      await axios.post("/api/borrower/apply-loan", payload);

      alert("Loan applied successfully 🎉");
      navigate("/borrower/my-loans");
    } catch (err) {
      console.error(err);
      alert("Failed to apply loan");
    }
  };

  if (loading) return <p className="loader">Loading...</p>;

  return (
    <div className="apply-loan-container">
      <h2>Apply for a Loan</h2>

      <input
        type="number"
        name="amount"
        placeholder="Loan Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="interestRate"
        placeholder="Interest Rate (%)"
        value={form.interestRate}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="tenureMonths"
        placeholder="Tenure (Months)"
        value={form.tenureMonths}
        onChange={handleChange}
        required
      />

      <div className="loan-buttons">
        <button onClick={previewEmi}>Preview EMI</button>
        <button onClick={handleApplyLoan}>Apply Loan</button>
      </div>

      {/* EMI PREVIEW */}
      {emiPreview && (
        <div className="emi-preview">
          <h3>EMI Preview</h3>
          <p><strong>Monthly EMI:</strong> ₹{emiPreview.emi}</p>
          <p><strong>Total Interest:</strong> ₹{emiPreview.totalInterest}</p>
          <p><strong>Total Payable:</strong> ₹{emiPreview.totalPayable}</p>
        </div>
      )}
    </div>
  );
};

export default ApplyLoan;
