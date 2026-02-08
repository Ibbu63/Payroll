import { useEffect, useState } from "react";
import "../../styles/hr.css";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH PENDING APPROVALS
  ========================= */
  const fetchApprovals = async () => {
    try {
      const res = await api.get("/hr/approvals");
      setApprovals(res.data);
    } catch (err) {
      console.error("Failed to load approvals", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  /* =========================
     ACTIONS
  ========================= */
  const approveUser = async (id) => {
    try {
      await api.patch(`/hr/approve/${id}`);
      fetchApprovals(); // refresh list
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  const rejectUser = async (id) => {
    try {
      await api.patch(`/hr/reject/${id}`);
      fetchApprovals();
    } catch (err) {
      console.error("Rejection failed", err);
    }
  };

  return (
    <div className="hr-page">
      <div className="hr-page-header">
        <h2>Approvals</h2>
        <p className="hr-subtext">Review and manage pending access requests</p>
      </div>

      <div className="hr-card approvals-table">
        {loading ? (
          <p>Loading approvals...</p>
        ) : approvals.length === 0 ? (
          <p>No pending approvals</p>
        ) : (
          <table className="hr-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role Requested</th>
                <th>Requested On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {approvals.map((item) => (
                <tr key={item._id}>
                  <td className="hr-employee-cell">
                    <div className="hr-avatar">
                      {item.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span>{item.name}</span>
                  </td>

                  <td>{item.role}</td>

                  <td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <span className="hr-status status-pending">
                      Pending
                    </span>
                  </td>

                  <td className="hr-actions">
                    <button
                      className="hr-btn approve"
                      onClick={() => approveUser(item._id)}
                    >
                      Approve
                    </button>

                    <button
                      className="hr-btn reject"
                      onClick={() => rejectUser(item._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Approvals;
