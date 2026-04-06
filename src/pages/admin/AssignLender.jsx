import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./AssignLender.css";

const AssignLender = () => {
  const [loans, setLoans] = useState([]);
  const [lenders, setLenders] = useState([]);
  const [selectedLender, setSelectedLender] = useState({});

  const fetchData = async () => {
    const loanRes = await axios.get("/api/admin/loans/applied");
    const lenderRes = await axios.get("/api/users/lenders");
    setLoans(loanRes.data);
    setLenders(lenderRes.data);
  };

  const assign = async (loanId) => {
    try {
      await axios.post(
        `/api/admin/assign-lender/${loanId}/${selectedLender[loanId]}`
      );
      alert("Lender assigned!");
      fetchData();
    } catch {
      alert("Assignment failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="assign-lender">
      <h2>Assign Lender</h2>

      <table className="loan-table">
        <thead>
          <tr>
            <th>Loan</th>
            <th>Borrower</th>
            <th>Select Lender</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>{loan.borrower?.user?.name}</td>
              <td>
                <select
                  onChange={(e) =>
                    setSelectedLender({
                      ...selectedLender,
                      [loan.id]: e.target.value,
                    })
                  }
                >
                  <option value="">Choose</option>
                  {lenders.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.user.name} (₹{l.availableFunds})
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className="assign-btn"
                  onClick={() => assign(loan.id)}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignLender;
