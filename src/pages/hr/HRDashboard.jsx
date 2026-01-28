import { useEffect, useState } from "react";
import "../../styles/hr.css";

const HRDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activePayroll: 0,
    pendingLeaves: 0,
    taxFilings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ================================
    // TEMP MOCK DATA (UI PREVIEW MODE)
    // Backend HR APIs not ready yet
    // ================================

    setTimeout(() => {
      setStats({
        totalEmployees: 1248,
        activePayroll: 452000,
        pendingLeaves: 12,
        taxFilings: 98,
      });
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="hr-page hr-dashboard">
      {/* PAGE HEADER */}
      <div className="hr-page-header">
        <h2>Dashboard</h2>
        <p className="hr-subtext">
          Overview of workforce, payroll readiness, and compliance status
        </p>
      </div>

      {/* LOADING STATE */}
      {loading && <p className="hr-loading">Loading dashboard data…</p>}

      {/* DASHBOARD CONTENT */}
      {!loading && (
        <>
          {/* KPI CARDS */}
          <div className="hr-stats-grid">
            <div className="hr-stat-card">
              <div className="hr-stat-title">Total Employees</div>
              <div className="hr-stat-value">{stats.totalEmployees}</div>
              <div className="hr-stat-foot">Company headcount</div>
            </div>

            <div className="hr-stat-card">
              <div className="hr-stat-title">Active Payroll</div>
              <div className="hr-stat-value">${stats.activePayroll}</div>
              <div className="hr-stat-foot">Employees on payroll</div>
            </div>

            <div className="hr-stat-card">
              <div className="hr-stat-title">Pending Leaves</div>
              <div className="hr-stat-value">{stats.pendingLeaves}</div>
              <div className="hr-stat-foot">Awaiting approval</div>
            </div>

            <div className="hr-stat-card">
              <div className="hr-stat-title">Tax Filings</div>
              <div className="hr-stat-value">{stats.taxFilings}%</div>
              <div className="hr-stat-foot">Compliance status</div>
            </div>
          </div>

          {/* SECONDARY SECTIONS */}
          <div className="hr-dashboard-sections">
            <div className="hr-card">
              <h3>Priority Alerts</h3>
              <ul className="hr-list">
                <li>Compliance deadline approaching</li>
                <li>Pending payroll approvals</li>
                <li>Missing tax declarations</li>
              </ul>
            </div>

            <div className="hr-card">
              <h3>Quick Insights</h3>
              <ul className="hr-list">
                <li>Most departments are payroll-ready</li>
                <li>Leave requests within limits</li>
                <li>No compliance risks detected</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HRDashboard;
