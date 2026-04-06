import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin 👋</p>

      <div className="admin-cards">
        {/* MANAGE LOANS */}
        <div
          className="admin-card"
          onClick={() => navigate("/admin/manage-loans")}
        >
          <h3>Manage Loans</h3>
          <p>Approve & assign lenders</p>
        </div>

        {/* VIEW USERS ✅ UPDATED */}
        <div
          className="admin-card"
          onClick={() => navigate("/admin/users")}
        >
          <h3>View Users</h3>
          <p>Borrowers, lenders, analysts</p>
        </div>

        {/* REPORTS */}
        <div className="admin-card">
          <h3>Reports</h3>
          <p>Loan analytics</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
