import "../../styles/hr.css";

const Loans = () => {
  const loans = [
    {
      employee: "Michael Chen",
      amount: "$5,000",
      type: "Personal Loan",
      date: "2024-03-05",
      status: "Pending",
    },
    {
      employee: "Elena Rodriguez",
      amount: "$8,500",
      type: "Home Loan",
      date: "2024-02-18",
      status: "Approved",
    },
    {
      employee: "David Kumar",
      amount: "$3,200",
      type: "Emergency Loan",
      date: "2024-02-10",
      status: "Rejected",
    },
  ];

  return (
    <div className="hr-page">
      {/* PAGE HEADER */}
      <div className="hr-page-header">
        <h2>Loans</h2>
        <p className="hr-subtext">
          Review and manage employee loan applications
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="hr-card loans-table">
        <table className="hr-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Loan Amount</th>
              <th>Loan Type</th>
              <th>Applied Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loans.map((loan, index) => (
              <tr key={index}>
                <td className="hr-employee-cell">
                  <span className="hr-avatar-placeholder"></span>
                  <span>{loan.employee}</span>
                </td>
                <td className="loan-amount">{loan.amount}</td>

                <td>
                  <span
                    className={`loan-type ${
                      loan.type.includes("Personal")
                        ? "loan-personal"
                        : loan.type.includes("Home")
                          ? "loan-home"
                          : "loan-emergency"
                    }`}
                  >
                    {loan.type}
                  </span>
                </td>

                <td>{loan.date}</td>
                <td>
                  <span
                    className={`hr-status ${
                      loan.status === "Approved"
                        ? "status-approved"
                        : loan.status === "Rejected"
                          ? "status-rejected"
                          : "status-pending"
                    }`}
                  >
                    {loan.status}
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

export default Loans;