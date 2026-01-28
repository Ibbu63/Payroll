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
            <LayoutDashboard />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/hr/employees" className="hr-nav-link">
            <Users />
            <span>Employees</span>
          </NavLink>

          <NavLink to="/hr/approvals" className="hr-nav-link">
            <CheckCircle />
            <span>Approvals</span>
          </NavLink>

          <NavLink to="/hr/reports" className="hr-nav-link">
            <BarChart3 />
            <span>Reports</span>
          </NavLink>

          <NavLink to="/hr/loans" className="hr-nav-link">
            <Landmark />
            <span>Loans</span>
          </NavLink>

          <NavLink to="/hr/requests" className="hr-nav-link">
            <ClipboardList />
            <span>Requests</span>
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="hr-main">
        <header className="hr-header">
          <h1>Human Resources</h1>
        </header>

        <div className="hr-content">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default HRLayout;
