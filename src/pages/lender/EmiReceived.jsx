import { useAuth } from "../../auth/AuthContext";
import "./LenderPages.css";

const EmiReceived = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <h2>EMI Received</h2>

      <div className="cards">
        <div className="card">
          <h4>Coming Soon 🚧</h4>

          <p>
            EMI payment history for lenders will be available in a future update.
          </p>

          <p>
            For now, you can track your performance using:
          </p>

          <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
            <li>Active Investments</li>
            <li>Completed Loans</li>
          </ul>

          <span className="badge approved">Planned Feature</span>
        </div>
      </div>
    </div>
  );
};

export default EmiReceived;
