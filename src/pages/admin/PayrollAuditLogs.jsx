import { useEffect, useState } from "react";
import "../../styles/admin.css";

export default function PayrollAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/payroll-overview/audit/logs", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch audit logs");
        }
        return res.json();
      })
      .then(data => {
        setLogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Unable to load audit logs");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="admin-page">Loading audit logs…</div>;
  }

  if (error) {
    return <div className="admin-page error">{error}</div>;
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Payroll Audit Logs</h2>
        <p className="muted">Read-only system audit trail</p>
      </div>

      <div className="card">
        <div className="audit-table">
          <div className="audit-head">
            <span>Period</span>
            <span>Action</span>
            <span>Performed By</span>
            <span>Timestamp</span>
          </div>

          {logs.length === 0 && (
            <p className="muted">No audit records found</p>
          )}

          {logs.map(log => (
            <div className="audit-row" key={log._id}>
              <span className="pill">{log.period}</span>
              <span className="success">{log.action}</span>
              <span>{log.performedBy}</span>
              <span>
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
