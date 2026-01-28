import { useEffect, useState } from "react";
import "../../styles/hr.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // TEMP MOCK DATA (UI preview)
    setEmployees([
      {
        id: 1,
        name: "Michael Chen",
        department: "Engineering",
        role: "Software Engineer",
        status: "Active",
      },
      {
        id: 2,
        name: "Elena Rodriguez",
        department: "HR",
        role: "HR Executive",
        status: "Active",
      },
      {
        id: 3,
        name: "David Kumar",
        department: "Finance",
        role: "Accountant",
        status: "On Leave",
      },
    ]);
  }, []);

  return (
    <div className="hr-page">
      <div className="hr-page-header">
        <h2>Employees</h2>
        <p className="hr-subtext">
          Manage employee records and workforce details
        </p>
      </div>

      <div className="hr-card">
        <table className="hr-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>
                  <span
                    className={`hr-status ${
                      emp.status === "Active"
                        ? "status-success"
                        : "status-pending"
                    }`}
                  >
                    {emp.status}
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

export default Employees;
