import "../../styles/hr.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* ===== CHART DATA ===== */
const reportsByTypeData = [
  { type: "Payroll", count: 8 },
  { type: "Compliance", count: 5 },
  { type: "Analytics", count: 6 },
  { type: "Finance", count: 4 },
];

const reportsTrendData = [
  { month: "Jan", reports: 4 },
  { month: "Feb", reports: 6 },
  { month: "Mar", reports: 9 },
  { month: "Apr", reports: 7 },
];

const Reports = () => {
  const reports = [
    {
      name: "Monthly Payroll Summary",
      type: "Payroll",
      period: "March 2024",
      status: "Completed",
    },
    {
      name: "Tax Deduction Report",
      type: "Compliance",
      period: "FY 2023-24",
      status: "Pending",
    },
    {
      name: "Department Cost Analysis",
      type: "Analytics",
      period: "Q1 2024",
      status: "Completed",
    },
  ];

  return (
    <div className="hr-page">
      {/* PAGE HEADER */}
      <div className="hr-page-header">
        <h2>Reports</h2>
        <p className="hr-subtext">
          View and generate payroll and compliance reports
        </p>
      </div>

      {/* ===== REPORTS ANALYTICS ===== */}
      <div className="hr-dashboard-charts reports-charts">
        {/* BAR CHART */}
        <div className="hr-card hr-chart-card">
          <h3>Reports by Type</h3>

          <div className="hr-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportsByTypeData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />
                <XAxis dataKey="type" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LINE CHART */}
        <div className="hr-card hr-chart-card">
          <h3>Reports Trend</h3>

          <div className="hr-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reportsTrendData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.08)"
                />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="reports"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===== REPORT FILTERS ===== */}
      <div className="hr-reports-filters">
        <div className="hr-filter-group">
          <select className="hr-filter">
            <option>All Types</option>
            <option>Payroll</option>
            <option>Compliance</option>
            <option>Analytics</option>
            <option>Finance</option>
          </select>

          <select className="hr-filter">
            <option>All Periods</option>
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Financial Year</option>
          </select>

          <select className="hr-filter">
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>

        <div className="hr-filter-actions">
          <input
            type="text"
            className="hr-filter-search"
            placeholder="Search reports..."
          />

          <button className="hr-primary-btn">Generate Report</button>
        </div>
      </div>

      {/* ===== REPORTS TABLE ===== */}
      <div className="hr-card reports-table">
        <table className="hr-table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Type</th>
              <th>Period</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.name}</td>
                <td>{report.type}</td>
                <td>{report.period}</td>
                <td>
                  <span
                    className={`hr-status ${
                      report.status === "Completed"
                        ? "status-approved"
                        : "status-pending"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td>
                  <button
                    className="hr-download-btn"
                    disabled={report.status === "Pending"}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
