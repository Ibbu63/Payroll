import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PayrollLayout from "./PayrollLayout";
import "../../styles/payroll.css";

const API_BASE = "http://localhost:5000";

const PayrollDashboard = () => {
  const [runs, setRuns] = useState([]);
  const [stats, setStats] = useState({
    ready: 0,
    processing: 0,
    gross: 0
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchRuns = useCallback(async () => {
    if (!token) {
      console.warn("No auth token found");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${API_BASE}/api/payroll/runs`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      let ready = 0;
      let processing = 0;
      let gross = 0;

      res.data.forEach(r => {
        if (r.status === "READY_FOR_PAYROLL") ready++;
        if (r.status === "PROCESSING") processing++;
        gross += r.grossPay;
      });

      setRuns(res.data);
      setStats({ ready, processing, gross });
    } catch (err) {
      console.error("Failed to fetch payroll runs", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchRuns();
  }, [fetchRuns]);

  return (
    <PayrollLayout>
      <h1>Payroll Processing Overview</h1>
      <p className="subtitle">
        Process and forward payroll batches for approval
      </p>

      {/* KPI CARDS */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <p>Ready for Payroll</p>
          <h2>{stats.ready}</h2>
        </div>

        <div className="kpi-card">
          <p>In Processing</p>
          <h2>{stats.processing}</h2>
        </div>

        <div className="kpi-card">
          <p>Total Gross Pay</p>
          <h2>${stats.gross.toLocaleString()}</h2>
        </div>

        <div className="kpi-card">
          <p>Next Payroll Date</p>
          <h2>Nov 15</h2>
        </div>
      </div>

      {/* PAYROLL RUNS TABLE */}
      <div className="table-card">
        <div className="table-header">
          <h3>Payroll Runs</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Department</th>
              <th>Employees</th>
              <th>Gross Pay</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="empty">
                  Loading payroll runs...
                </td>
              </tr>
            )}

            {!loading && runs.length === 0 && (
              <tr>
                <td colSpan="6" className="empty">
                  No payroll runs available
                </td>
              </tr>
            )}

            {runs.map(run => (
              <tr key={run._id}>
                <td className="link">#{run.batchId}</td>
                <td>{run.department}</td>
                <td>{run.employeeCount}</td>
                <td>${run.grossPay.toLocaleString()}</td>
                <td>
                  <span className={`status ${run.status.toLowerCase()}`}>
                    {run.status.replaceAll("_", " ")}
                  </span>
                </td>
                <td>
                  {run.status === "READY_FOR_PAYROLL" && (
                    <button className="btn primary">Start</button>
                  )}
                  {run.status === "PROCESSING" && (
                    <button className="btn warning">Complete</button>
                  )}
                  {run.status === "COMPLETED" && (
                    <button className="btn secondary">Send</button>
                  )}
                  {run.status === "SENT_TO_ADMIN" && (
                    <span className="locked">Locked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="rbac">
          RBAC Enforcement Active — Payroll Manager permissions applied
        </div>
      </div>
    </PayrollLayout>
  );
};

export default PayrollDashboard;
