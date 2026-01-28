import { useEffect, useState } from "react";
import "../../styles/hr.css";

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    // TEMP MOCK DATA (UI preview)
    setApprovals([
      {
        id: 1,
        employee: "Elena Rodriguez",
        type: "Leave Request",
        date: "2024-03-12",
        status: "Pending",
      },
      {
        id: 2,
        employee: "Michael Chen",
        type: "Payroll Approval",
        date: "2024-03-10",
        status: "Pending",
      },
      {
        id: 3,
        employee: "David Kumar",
        type: "Loan Request",
        date: "2024-03-08",
        status: "Approved",
      },
    ]);
  }, []);

  return (
    <div className="hr-page">
      <div className="hr-page-header">
        <h2>Approvals</h2>
        <p className="hr-subtext">Review and manage pending HR approvals</p>
      </div>

      <div className="hr-card">
        <table className="hr-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Request Type</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((item) => (
              <tr key={item.id}>
                <td>{item.employee}</td>
                <td>{item.type}</td>
                <td>{item.date}</td>
                <td>
                  <span
                    className={`hr-status ${
                      item.status === "Approved"
                        ? "status-success"
                        : "status-pending"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approvals;
