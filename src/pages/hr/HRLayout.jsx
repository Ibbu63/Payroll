import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  BarChart3,
  Landmark,
  ClipboardList,
} from "lucide-react";
import "../../styles/hr.css";

const HRLayout = () => {
  return (
    <div className="hr-app">
      {/* SIDEBAR */}
      <aside className="hr-sidebar">
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
    </div>
  );
};

export default HRLayout;
