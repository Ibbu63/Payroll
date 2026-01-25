import PayrollLayout from "./PayrollLayout";
import "../../styles/payroll.css";

const Payslips = () => {
  const payslips = [
    {
      name: "John Doe",
      month: "September",
      gross: 45000,
      deductions: 5000,
      net: 40000
    },
    {
      name: "Jane Smith",
      month: "September",
      gross: 50000,
      deductions: 7000,
      net: 43000
    }
  ];

  return (
    <PayrollLayout>
      <h1>Payslips</h1>
      <p className="subtitle">
        View generated payslips for employees
      </p>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Month</th>
              <th>Gross Pay</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payslips.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>{p.month}</td>
                <td>₹{p.gross}</td>
                <td>₹{p.deductions}</td>
                <td>₹{p.net}</td>
                <td>
                  <button className="btn secondary">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PayrollLayout>
  );
};

export default Payslips;
