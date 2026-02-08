import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  BarChart3,
  Landmark,
  ClipboardList,
  LogOut,
} from "lucide-react";
import "../../styles/hr.css";

const HRLayout = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="hr-app">
      {/* SIDEBAR */}
      <aside className="hr-sidebar">
        <div>
          <div className="hr-sidebar-header">
            <h2>Enterprise</h2>
            <span>HR Admin Panel</span>
          </div>

          <nav className="hr-nav">
            <NavLink to="/hr/dashboard" className="hr-nav-link">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/hr/employees" className="hr-nav-link">
              <Users size={18} />
              <span>Employees</span>
            </NavLink>

            <NavLink to="/hr/approvals" className="hr-nav-link">
              <CheckCircle size={18} />
              <span>Approvals</span>
            </NavLink>

            <NavLink to="/hr/reports" className="hr-nav-link">
              <BarChart3 size={18} />
              <span>Reports</span>
            </NavLink>

            <NavLink to="/hr/loans" className="hr-nav-link">
              <Landmark size={18} />
              <span>Loans</span>
            </NavLink>

            <NavLink to="/hr/requests" className="hr-nav-link">
              <ClipboardList size={18} />
              <span>Requests</span>
            </NavLink>
          </nav>
        </div>

        {/* 🔴 LOGOUT AT BOTTOM */}
        <button
          className="hr-logout-sidebar"
          onClick={() => setShowLogout(true)}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* MAIN */}
      <div className="hr-main">
        <header className="hr-header">
          <h1>Human Resources</h1>
        </header>

        <main className="hr-content">
          <Outlet />
        </main>
      </div>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="hr-modal-backdrop">
          <div className="hr-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>

            <div className="hr-modal-actions">
              <button
                className="btn-cancel"
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
    </div>
  );
};

export default HRLayout;
