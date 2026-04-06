import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // profile route based on role
  const getProfileRoute = () => {
    if (!user) return "/";
    switch (user.role) {
      case "BORROWER":
        return "/borrower/profile";
      case "LENDER":
        return "/lender/profile";
      case "ADMIN":
        return "/admin/profile";
      case "ANALYST":
        return "/analyst/profile";
      default:
        return "/";
    }
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-logo">
        <Link to="/">Loanera</Link>
      </div>

      {/* RIGHT */}
      <div className="navbar-links">
        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </>
        )}

        {/* LOGGED IN */}
        {user && (
          <>
            <Link to="/">Home</Link>

            {/* DASHBOARDS */}
            {user.role === "ADMIN" && (
              <Link to="/admin">Dashboard</Link>
            )}

            {user.role === "BORROWER" && (
              <Link to="/borrower">Dashboard</Link>
            )}

            {user.role === "LENDER" && (
              <Link to="/lender">Dashboard</Link>
            )}

            {user.role === "ANALYST" && (
              <Link to="/analyst">Dashboard</Link>
            )}

            {/* PROFILE */}
            <Link to={getProfileRoute()}>My Profile</Link>

            {/* USER */}
            <span className="user-name">{user.name}</span>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
