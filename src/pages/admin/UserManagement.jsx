import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin-users.css";

const API = "http://localhost:5000/api/admin";

function UserManagement() {
  const [pending, setPending] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchPending = async () => {
    const res = await axios.get(`${API}/access-requests`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setPending(res.data);
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approve = async (id) => {
    await axios.put(
      `${API}/access-requests/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchPending();
  };

  const reject = async (id) => {
    await axios.put(
      `${API}/access-requests/${id}/reject`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchPending();
  };

  return (
    <>
      <div className="pending-section">
        <h2>Pending Access Requests</h2>

        {pending.length === 0 ? (
          <p className="empty-text">No pending access requests</p>
        ) : (
          <div className="pending-table">
            <div className="pending-header">
              <span>User</span>
              <span>Email</span>
              <span>Role</span>
              <span>Requested</span>
              <span>Actions</span>
            </div>

            {pending.map(user => (
              <div className="pending-row" key={user._id}>
                <span className="user-name">{user.name}</span>
                <span>{user.email}</span>
                <span className="role-pill">{user.role}</span>
                <span>
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>

                <span className="actions">
                  <button
                    className="icon-btn approve"
                    title="Approve"
                    onClick={() => approve(user._id)}
                  >
                    ✔
                  </button>

                  <button
                    className="icon-btn reject"
                    title="Reject"
                    onClick={() => reject(user._id)}
                  >
                    ✖
                  </button>

                  <button
                    className="icon-btn view"
                    title="View"
                    onClick={() => setSelectedUser(user)}
                  >
                    👁
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔽 MODAL MUST LIVE HERE */}
      {selectedUser && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>User Request Details</h3>

            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Role Requested:</strong> {selectedUser.role}</p>
            <p>
              <strong>Requested On:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleString()}
            </p>

            <button
              className="close-btn"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserManagement;
