import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post("https://loanera-backend-production.up.railway.app/api/login", {
      email,
      password,
    });

    login(res.data);

    if (res.data.role === "ADMIN") {
      navigate("/admin");
    } else if (res.data.role === "BORROWER") {
      navigate("/borrower");
    } else if (res.data.role === "LENDER") {
      navigate("/lender");
    } else if (res.data.role === "ANALYST") {
      navigate("/analyst/dashboard");   // ✅ THIS WAS MISSING
    }
  } catch {
    setError("Invalid email or password");
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to LMS</h2>
        <p className="subtitle">Secure Loan Management Portal</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="switch">
          New user? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
