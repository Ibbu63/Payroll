import {
  FaTachometerAlt,
  FaUsersCog,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaCog,
  FaLifeRing,
  FaSignOutAlt
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

export default function Sidebar() {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <aside className="sidebar">
        <nav>
          <NavLink to="/admin/dashboard">
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink to="/admin/users">
            <FaUsersCog /> User Management
          </NavLink>

          <NavLink to="/admin/payroll">
            <FaMoneyCheckAlt /> Payroll Oversight
          </NavLink>

          <NavLink to="/admin/audit-logs">
            <FaFileAlt /> Reports & Logs
          </NavLink>

          <NavLink to="/admin/settings">
            <FaCog /> System Settings
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <button className="support-btn">
            <FaLifeRing /> Support
          </button>

          <button className="logout-btn" onClick={() => setShowLogout(true)}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          onConfirm={confirmLogout}
        />
      )}
    </>
  );
}
