import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaUserShield,
  FaUsers,
  FaMoneyCheckAlt,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import "../styles/Login.css";

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("Admin"); // UI only
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Payroll";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const { token, role } = res.data;

      // 🔐 Store EXACT backend values
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // 🔁 SINGLE, AUTHORITATIVE REDIRECT
      switch (role) {
        case "admin":
          navigate("/admin", { replace: true });
          break;

        case "PAYROLL_MANAGER":
          navigate("/payroll/dashboard", { replace: true });
          break;

        case "HR":
          navigate("/hr", { replace: true });
          break;

        case "EMPLOYEE":
          navigate("/employee", { replace: true });
          break;

        default:
          alert("Unauthorized role");
          localStorage.clear();
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccess = () => {
    navigate("/access-request");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">
            Select your workspace role to begin session
          </p>

          {/* ROLE SELECTOR (UI ONLY) */}
          <div className="role-selector">
            <button
              type="button"
              className={selectedRole === "Admin" ? "role-btn active" : "role-btn"}
              onClick={() => setSelectedRole("Admin")}
            >
              <FaUserShield />
              <span>Admin</span>
            </button>

            <button
              type="button"
              className={selectedRole === "HR" ? "role-btn active" : "role-btn"}
              onClick={() => setSelectedRole("HR")}
            >
              <FaUsers />
              <span>HR</span>
            </button>

            <button
              type="button"
              className={selectedRole === "Payroll" ? "role-btn active" : "role-btn"}
              onClick={() => setSelectedRole("Payroll")}
            >
              <FaMoneyCheckAlt />
              <span>Payroll</span>
            </button>

            <button
              type="button"
              className={selectedRole === "Employee" ? "role-btn active" : "role-btn"}
              onClick={() => setSelectedRole("Employee")}
            >
              <FaUser />
              <span>Employee</span>
            </button>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-icon">
                <FaEnvelope className="left-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-icon">
                <FaLock className="left-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="right-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In to Dashboard →"}
            </button>
          </form>

          {/* REQUEST ACCESS */}
          <p className="request">
            New to the portal?{" "}
            <span className="request-link" onClick={handleRequestAccess}>
              Request Access
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
