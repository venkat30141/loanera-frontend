import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import Navbar from "../../components/common/Navbar";
import "./EmiSchedule.css";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const EmiSchedule = () => {
  const { loanId } = useParams();
  const [emis, setEmis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingEmiId, setPayingEmiId] = useState(null);

  // =========================
  // FETCH EMI SCHEDULE
  // =========================
  const fetchEmis = async () => {
    try {
      const res = await axios.get(`/api/borrower/emi/${loanId}`);
      setEmis(res.data);
    } catch (err) {
      alert("Failed to load EMI schedule");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmis();
  }, [loanId]);

  // =========================
  // PAY EMI (CORRECT API)
  // =========================
  const payEmi = async (emiId) => {
    if (!window.confirm("Confirm EMI payment?")) return;

    try {
      setPayingEmiId(emiId);

      // ✅ CORRECT ENDPOINT + METHOD
      await axios.put(`/api/payment/emi/${emiId}/pay`);

      alert("EMI paid successfully");
      fetchEmis();
    } catch (err) {
      alert("Failed to pay EMI");
      console.error(err.response?.data || err.message);
    } finally {
      setPayingEmiId(null);
    }
  };

  if (loading) return <p className="loader">Loading...</p>;

  // =========================
  // FIRST UNPAID EMI (UI RULE)
  // =========================
  const firstUnpaidEmiId = emis.find(e => !e.isPaid)?.id;

  // =========================
  // GROUP EMIS BY YEAR + MONTH
  // =========================
  const calendar = {};
  emis.forEach((emi) => {
    const date = new Date(emi.dueDate);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();

    if (!calendar[year]) calendar[year] = {};
    calendar[year][monthIndex] = emi;
  });

  return (
    <>
      

      <div className="emi-container">
        <h2>📆 EMI Calendar (Loan #{loanId})</h2>

        {Object.keys(calendar).map((year) => (
          <div key={year} className="emi-year">
            <h3>{year}</h3>

            <div className="calendar-grid">
              {months.map((month, index) => {
                const emi = calendar[year][index];

                return (
                  <div key={month} className="calendar-box">
                    <h4>{month}</h4>

                    {emi ? (
                      <>
                        <p>₹ {emi.emiAmount}</p>
                        <p className="due-date">
                          Due: {new Date(emi.dueDate).toLocaleDateString()}
                        </p>

                        {emi.isPaid ? (
                          <span className="paid">PAID</span>
                        ) : emi.id === firstUnpaidEmiId ? (
                          <button
                            className="pay-btn"
                            disabled={payingEmiId === emi.id}
                            onClick={() => payEmi(emi.id)}
                          >
                            {payingEmiId === emi.id
                              ? "Paying..."
                              : "Pay EMI"}
                          </button>
                        ) : (
                          <button className="pay-btn disabled" disabled>
                            Pay previous EMI first
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="no-emi">—</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EmiSchedule;
