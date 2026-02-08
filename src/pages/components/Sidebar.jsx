import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiGrid,
  FiFileText,
  FiDollarSign,
  FiPercent,
  FiTrendingUp,
  FiUser,
  FiLogOut
} from "react-icons/fi";

export default function Sidebar() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 clear auth (adjust if you use context/redux)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/", { replace: true });
  };

  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <h2>Payroll Pro</h2>
          <span>ENTERPRISE UI</span>
        </div>

        <p className="section">MAIN MENU</p>

        <NavLink to="dashboard" end className="menu">
          <FiGrid /> <span>Dashboard</span>
        </NavLink>

        <NavLink to="payslips" className="menu">
          <FiFileText /> <span>My Payslips</span>
        </NavLink>

        <NavLink to="salary" className="menu">
          <FiDollarSign /> <span>Salary Breakup</span>
        </NavLink>

        <NavLink to="tax" className="menu">
          <FiPercent /> <span>Tax Details</span>
        </NavLink>

        <NavLink to="investments" className="menu">
          <FiTrendingUp /> <span>Investments</span>
        </NavLink>

        <p className="section">ACCOUNT</p>

        <NavLink to="profile" className="menu">
          <FiUser /> <span>My Profile</span>
        </NavLink>

        {/* 🔥 LOGOUT */}
        <button className="menu logout" onClick={() => setShowLogout(true)}>
          <FiLogOut /> <span>Logout</span>
        </button>
      </aside>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>

            <div className="modal-actions">
              <button
                className="btn-outline"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>
              <button className="btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
