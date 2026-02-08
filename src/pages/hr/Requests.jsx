import { useState } from "react";
import "../../styles/hr.css";

const Requests = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const [requests, setRequests] = useState([
    {
      employee: "Michael Chen",
      requestType: "Address Change",
      submittedOn: "2024-03-14",
      status: "Pending",
      notes: "Employee requested an address update for payroll records.",
    },
    {
      employee: "Elena Rodriguez",
      requestType: "Bank Details Update",
      submittedOn: "2024-03-10",
      status: "Approved",
      notes: "Updated bank account details for salary disbursement.",
    },
    {
      employee: "David Kumar",
      requestType: "Name Correction",
      submittedOn: "2024-03-05",
      status: "Rejected",
      notes: "Request rejected due to missing supporting documents.",
    },
  ]);

  const updateStatus = (index, newStatus) => {
    setRequests((prev) =>
      prev.map((req, i) => (i === index ? { ...req, status: newStatus } : req)),
    );
  };

  return (
    <div className="hr-page">
      {/* PAGE HEADER */}
      <div className="hr-page-header">
        <h2>Requests</h2>
        <p className="hr-subtext">
          Review and manage employee service requests
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="hr-card requests-table">
        <table className="hr-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Request Type</th>
              <th>Submitted On</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req, index) => (
              <>
                {/* MAIN ROW */}
                <tr
                  key={index}
                  className="hr-request-row"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <td>{req.employee}</td>
                  <td>{req.requestType}</td>
                  <td>{req.submittedOn}</td>
                  <td>
                    <div className="hr-request-status-wrapper">
                      <span
                        className={`hr-status ${
                          req.status === "Approved"
                            ? "status-approved"
                            : req.status === "Rejected"
                              ? "status-rejected"
                              : "status-pending"
                        }`}
                      >
                        {req.status}
                      </span>

                      {req.status === "Pending" && (
                        <div className="hr-request-actions">
                          <button
                            className="hr-approve-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(index, "Approved");
                            }}
                          >
                            Approve
                          </button>

                          <button
                            className="hr-reject-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(index, "Rejected");
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>

                {/* INLINE PREVIEW */}
                {openIndex === index && (
                  <tr className="hr-request-preview-row">
                    <td colSpan="4">
                      <div className="hr-request-preview">
                        <p>
                          <strong>Employee:</strong> {req.employee}
                        </p>
                        <p>
                          <strong>Request Type:</strong> {req.requestType}
                        </p>
                        <p>
                          <strong>Submitted On:</strong> {req.submittedOn}
                        </p>
                        <p>
                          <strong>Notes:</strong> {req.notes}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;