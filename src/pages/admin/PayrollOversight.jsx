import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "../../styles/admin-payroll.css";

export default function PayrollOversight() {
  const [view, setView] = useState("monthly");
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [finalized, setFinalized] = useState(false);

  // 🔹 FETCH PAYROLL DATA
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/payroll-overview/${view}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load payroll data");
        return res.json();
      })
      .then(data => {
        setCurrent(data);
        setFinalized(Boolean(data.finalized));
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load payroll data");
        setLoading(false);
      });
  }, [view]);

  // 🔹 FINALIZE HANDLER (NO ALERTS, NO RELOAD)
  const handleFinalize = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/payroll-overview/finalize/${view}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            performedBy: "admin@enterprise.com"
          })
        }
      );

      if (!res.ok) return;

      // Reflect backend truth in UI
      setFinalized(true);
    } catch (err) {
      console.error("Finalize failed", err);
    }
  };

  // 🔹 GUARDS
  if (loading) {
    return <div className="admin-page">Loading payroll data…</div>;
  }

  if (error) {
    return <div className="admin-page error">{error}</div>;
  }

  if (!current) {
    return <div className="admin-page">No payroll data available</div>;
  }

  const canFinalize = current.verified === 100 && !finalized;

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="page-header">
        <h2>Payroll Financial Oversight</h2>

        <div className="toggle-group">
          <button
            className={`toggle-btn ${view === "monthly" ? "active" : ""}`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </button>
          <button
            className={`toggle-btn ${view === "quarterly" ? "active" : ""}`}
            onClick={() => setView("quarterly")}
          >
            Quarterly
          </button>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="timeline-grid">
        {current.timeline.map((item, i) => (
          <div key={i} className={`timeline-card ${item.status}`}>
            <span className="tag">{item.status}</span>
            <h4>{item.title}</h4>
            <p>{item.period}</p>
            <strong>{item.amount}</strong>
            {item.badge && <span className="badge">{item.badge}</span>}
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="stats-grid">
        <div className="stat-card highlight">
          <h5>Total Net Pay</h5>
          <h2>{current.stats.netPay}</h2>
          <p className="positive">
            {view === "monthly" ? "Monthly payout" : "Quarterly payout"}
          </p>
        </div>

        <div className="stat-card">
          <h5>Tax Withholdings</h5>
          <h2>{current.stats.tax}</h2>
          <p className="negative">
            {view === "monthly" ? "Monthly deductions" : "Quarterly deductions"}
          </p>
        </div>

        <div className="stat-card">
          <h5>Employer Contributions</h5>
          <h2>{current.stats.employer}</h2>
          <p className="positive">Benefits, PF & insurance</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">
        <div className="card chart-card">
          <h3>Payroll Cost Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={current.charts.breakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="netPay" stackId="a" fill="#22c55e" />
              <Bar dataKey="tax" stackId="a" fill="#ef4444" />
              <Bar dataKey="employer" stackId="a" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h3>Payroll Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={current.charts.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="netPay" stroke="#22c55e" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="tax" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="employer" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FINALIZE */}
      <div className="content-grid">
        <div className="card">
          <h3>
            Verification Status{" "}
            <span className={current.verified === 100 ? "success-badge" : "warning-badge"}>
              {current.verified}% Verified
            </span>
          </h3>

          <button
            className={`primary-btn full ${finalized ? "locked" : ""}`}
            disabled={!canFinalize}
            onClick={handleFinalize}
          >
            {finalized ? "Signed & Finalized" : "Sign & Finalize Cycle"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* TOOLTIP */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="chart-tooltip">
      <strong>{label}</strong>
      {payload.map((item, i) => (
        <div key={i} className="tooltip-row">
          <span className="dot" style={{ background: item.color }} />
          <span>
            {item.name}: ₹{item.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
