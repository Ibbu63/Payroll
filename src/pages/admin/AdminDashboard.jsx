import { useEffect } from "react";
import {
  FaUsers,
  FaMoneyCheckAlt,
  FaExclamationTriangle,
  FaShieldAlt
} from "react-icons/fa";

import StatCard from "../../components/admin/StatCard";
import RecentActivities from "../../components/admin/RecentActivities";
import QuickActions from "../../components/admin/QuickActions";
import SystemHealth from "../../components/admin/SystemHealth";
import PayrollHistoryBar from "../../components/admin/PayrollHistoryBar";

export default function AdminDashboard() {
  useEffect(() => {
    document.title = "Admin Dashboard | Payroll";
  }, []);

  return (
    <>

      {/* ANALYTICS */}
      <section className="analytics-section">
        <h2 className="section-title">Analytics Overview</h2>

        <div className="analytics-grid analytics-2col">
          <PayrollHistoryBar />
        </div>
      </section>

      {/* KPI CARDS */}
      <div className="stats-grid">
        <StatCard
          title="Total Employees"
          value="1,284"
          sub="+2.5% vs last month"
          icon={<FaUsers />}
        />

        <StatCard
          title="Monthly Payroll"
          value="₹428,500"
          icon={<FaMoneyCheckAlt />}
        />

        <StatCard
          title="Pending Approvals"
          value="12"
          badge="HIGH"
          icon={<FaExclamationTriangle />}
        />

        <StatCard
          title="Compliance Health"
          value="98%"
          icon={<FaShieldAlt />}
        />
      </div>

      {/* OPERATIONAL SECTION */}
      <div className="content-grid">
        <RecentActivities />

        <div className="right-panel">
          <QuickActions />
          <SystemHealth />
        </div>
      </div>
    </>
  );
}
