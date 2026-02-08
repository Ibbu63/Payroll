import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getHRDashboard } from "../../services/hr.service";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const HRDashboard = () => {
  /* =======================
     STATE
  ======================= */
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =======================
     FETCH DASHBOARD DATA
  ======================= */
  useEffect(() => {
    getHRDashboard()
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("HR dashboard fetch failed", err);
        setLoading(false);
      });
  }, []);

  /* =======================
     STATIC CHART DATA
     (Replace later with API)
  ======================= */
  const workforceData = {
    labels: ["Engineering", "HR", "Finance", "Marketing", "Operations"],
    datasets: [
      {
        label: "Employees",
        data: [420, 180, 220, 150, 260],
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#8b5cf6",
          "#f59e0b",
          "#0ea5e9",
        ],
        borderRadius: 10,
      },
    ],
  };

  const leaveTrendData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Leave Requests",
        data: [5, 8, 6, 10, 12],
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.15)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#38bdf8",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#e5e7eb",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <>
      {/* PAGE HEADER */}
      <div className="hr-page-header">
        <h2>Dashboard</h2>
        <p className="hr-subtext">
          Overview of workforce, payroll readiness, and compliance status
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="hr-stats-grid">
        <div className="hr-stat-card">
          <div className="hr-stat-title">Total Employees</div>
          <div className="hr-stat-value">
            {loading ? "--" : stats?.totalUsers}
          </div>
          <div className="hr-stat-foot"> Emp: {stats?.totalUsers}</div>
        </div>

        <div className="hr-stat-card">
          <div className="hr-stat-title">Active Payroll</div>
          <div className="hr-stat-value">N/A</div>
          <div className="hr-stat-foot">Backend not implemented</div>
        </div>

        <div className="hr-stat-card">
          <div className="hr-stat-title">Pending Approvals</div>
          <div className="hr-stat-value">
            {loading ? "--" : stats?.pendingApprovals}
          </div>
          <div className="hr-stat-foot">Awaiting HR action</div>
        </div>

        <div className="hr-stat-card">
          <div className="hr-stat-title">Tax Filings</div>
          <div className="hr-stat-value">N/A</div>
          <div className="hr-stat-foot">Compliance data pending</div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="hr-dashboard-charts">
        <div className="hr-card hr-chart-card">
          <h3>Workforce Distribution</h3>
          <div className="hr-chart-wrapper">
            <Bar data={workforceData} options={chartOptions} />
          </div>
        </div>

        <div className="hr-card hr-chart-card">
          <h3>Leave Requests Trend</h3>
          <div className="hr-chart-wrapper">
            <Line data={leaveTrendData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* INSIGHTS */}
      <div className="hr-dashboard-sections">
        <div className="hr-card">
          <h3>Priority Alerts</h3>
          <ul>
            <li>{stats?.pendingApprovals || 0} pending approvals</li>
            <li>Payroll cycle upcoming</li>
            <li>Tax declarations under review</li>
          </ul>
        </div>

        <div className="hr-card">
          <h3>Quick Insights</h3>
          <ul>
            <li>Employee onboarding stable</li>
            <li>HR approvals within limits</li>
            <li>No critical compliance risks</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HRDashboard;
