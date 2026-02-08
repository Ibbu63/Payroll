import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/hr.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/hr/employees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployees(res.data);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [token]);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  const togglePreview = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="hr-page">
      {/* HEADER */}
      <div className="hr-page-header">
        <h2>Employees</h2>
        <p className="hr-subtext">
          Manage employee records and workforce details
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="hr-card">
        {loading ? (
          <p>Loading employees...</p>
        ) : employees.length === 0 ? (
          <p>No approved employees found</p>
        ) : (
          <table className="hr-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp, index) => (
                <>
                  {/* MAIN ROW */}
                  <tr
                    key={emp._id}
                    className="hr-clickable-row"
                    onClick={() => togglePreview(index)}
                  >
                    <td className="hr-employee-cell">
                      <div className="hr-avatar">
                        {getInitials(emp.name)}
                      </div>
                      <span>{emp.name}</span>
                    </td>

                    <td>
                      <span className="hr-tag">
                        {emp.department || "—"}
                      </span>
                    </td>

                    <td>{emp.role}</td>

                    <td>
                      <span className="hr-status status-active">
                        Active
                      </span>
                    </td>
                  </tr>

                  {/* INLINE PROFILE PREVIEW */}
                  {openIndex === index && (
                    <tr className="hr-request-preview-row">
                      <td colSpan="4">
                        <div className="hr-request-preview">
                          <p>
                            <strong>Name:</strong> {emp.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {emp.email}
                          </p>
                          <p>
                            <strong>Department:</strong>{" "}
                            {emp.department || "Not assigned"}
                          </p>
                          <p>
                            <strong>Role:</strong> {emp.role}
                          </p>
                          <p>
                            <strong>Employment Status:</strong>{" "}
                            {emp.employmentStatus || "Active"}
                          </p>
                          <p>
                            <strong>Joined On:</strong>{" "}
                            {emp.joiningDate
                              ? new Date(
                                  emp.joiningDate
                                ).toLocaleDateString()
                              : "—"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Employees;
