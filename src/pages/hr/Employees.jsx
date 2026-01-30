import "../../styles/hr.css";

const Employees = () => {
  const employees = [
    {
      name: "Michael Chen",
      department: "Engineering",
      role: "Software Engineer",
      status: "Active",
    },
    {
      name: "Elena Rodriguez",
      department: "HR",
      role: "HR Executive",
      status: "Active",
    },
    {
      name: "David Kumar",
      department: "Finance",
      role: "Accountant",
      status: "On Leave",
    },
  ];

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

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
              <tr key={index}>
                {/* EMPLOYEE */}
                <td className="hr-employee-cell">
                  <div className="hr-avatar">{getInitials(emp.name)}</div>
                  <span>{emp.name}</span>
                </td>

                {/* DEPARTMENT */}
                <td>
                  <span className="hr-tag">{emp.department}</span>
                </td>

                {/* ROLE */}
                <td>{emp.role}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`hr-status ${
                      emp.status === "Active" ? "status-active" : "status-leave"
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
