import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admin-users.css";

const USERS_API = "http://localhost:5000/api/admin/users";
const REQUESTS_API = "http://localhost:5000/api/access-requests";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch approved users
  const fetchUsers = async () => {
    const res = await axios.get(USERS_API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(res.data);
  };

  // Fetch pending access requests
  const fetchRequests = async () => {
    const res = await axios.get(REQUESTS_API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setRequests(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchRequests();
  }, []);

  const updateStatus = async (id, action) => {
    await axios.put(
      `${REQUESTS_API}/${id}/${action}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Refresh both lists
    fetchUsers();
    fetchRequests();
  };

  return (
    <div className="pending-section">
      {/* ================= Pending Requests ================= */}
      <h2>User Management – Pending Requests</h2>

      <div className="pending-table">
        <div className="pending-header">
          <span>Name</span>
          <span>Email</span>
          <span>Requested Role</span>
          <span>Actions</span>
        </div>

        {requests.length === 0 && (
          <div className="pending-row">No pending requests</div>
        )}

        {requests.map(req => (
          <div className="pending-row" key={req._id}>
            <span>{req.name}</span>
            <span>{req.email}</span>
            <span className="role-pill">{req.requestedRole}</span>

            <span className="actions">
              <button
                className="icon-btn approve"
                onClick={() => updateStatus(req._id, "approve")}
              >
                ✔
              </button>

              <button
                className="icon-btn reject"
                onClick={() => updateStatus(req._id, "reject")}
              >
                ✖
              </button>
            </span>
          </div>
        ))}
      </div>

      {/* ================= Approved Users ================= */}
      <h2 style={{ marginTop: "40px" }}>Approved Users</h2>

      <div className="pending-table">
        <div className="pending-header">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
        </div>

        {users.length === 0 && (
          <div className="pending-row">No approved users</div>
        )}

        {users.map(user => (
          <div className="pending-row" key={user._id}>
            <span className="user-name">{user.name}</span>
            <span>{user.email}</span>
            <span className="role-pill">{user.role}</span>
            <span className="approved-pill">APPROVED</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserManagement;
