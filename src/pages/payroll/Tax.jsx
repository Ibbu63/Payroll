import PayrollLayout from "./PayrollLayout";
import "../../styles/payroll.css";

const Tax = () => {
  const taxData = [
    {
      name: "John Doe",
      gross: 45000,
      tax: 3000,
      net: 42000
    },
    {
      name: "Jane Smith",
      gross: 50000,
      tax: 5000,
      net: 45000
    }
  ];

  return (
    <PayrollLayout>
      <h1>Tax Management</h1>
      <p className="subtitle">
        Review tax deductions applied to employee salaries
      </p>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Gross Salary</th>
              <th>Tax Deducted</th>
              <th>Net Pay</th>
            </tr>
          </thead>

          <tbody>
            {taxData.map((t, index) => (
              <tr key={index}>
                <td>{t.name}</td>
                <td>₹{t.gross}</td>
                <td>₹{t.tax}</td>
                <td>₹{t.net}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PayrollLayout>
  );
};

export default Tax;
