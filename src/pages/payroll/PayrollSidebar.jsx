import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../../styles/payroll.css";

const PayrollSidebar = () => {
  const [showLogout, setShowLogout] = useState(false);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <>
      <aside className="payroll-sidebar">
        <h2 className="sidebar-title">Payroll</h2>

        <nav className="sidebar-nav">
          <NavLink to="/payroll/dashboard">Dashboard</NavLink>
          <NavLink to="/payroll/analytics">Analytics</NavLink>
          <NavLink to="/payroll/payslips">Payslips</NavLink>
          <NavLink to="/payroll/disbursement">Disbursement</NavLink>
          <NavLink to="/payroll/tax">Tax</NavLink>
        </nav>

        <button
          className="logout-btn"
          onClick={() => setShowLogout(true)}
        >
          Logout
        </button>
      </aside>

      {/* LOGOUT CONFIRM MODAL */}
      {showLogout && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>

            <div className="logout-actions">
              <button
                className="btn secondary"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>
              <button
                className="btn danger"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PayrollSidebar;
