import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import api from "../../api/axios"; // ✅ use central axios
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await api.post("/api/login", {
        email,
        password,
      });

      console.log("Login Success:", res.data);

      // store user in context
      login(res.data);

      // role-based navigation
      switch (res.data.role) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "BORROWER":
          navigate("/borrower");
          break;
        case "LENDER":
          navigate("/lender");
          break;
        case "ANALYST":
          navigate("/analyst/dashboard");
          break;
        default:
          navigate("/");
      }

    } catch (err) {
      console.error(err);
      setError("Invalid email or password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to LMS</h2>
        <p className="subtitle">Secure Loan Management Portal</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* BUTTON */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="switch">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;