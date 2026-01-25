import { useState } from "react";
import PayrollLayout from "./PayrollLayout";
import "../../styles/payroll.css";

const Disbursement = () => {
  const [payments, setPayments] = useState([
    {
      name: "John Doe",
      netPay: 40000,
      status: "PENDING",
      paidAt: null
    },
    {
      name: "Jane Smith",
      netPay: 43000,
      status: "PAID",
      paidAt: "15 Sep 2026"
    }
  ]);

  const markAsPaid = (index) => {
    const updated = [...payments];
    updated[index].status = "PAID";
    updated[index].paidAt = new Date().toLocaleDateString();
    setPayments(updated);
  };

  return (
    <PayrollLayout>
      <h1>Salary Disbursement</h1>
      <p className="subtitle">
        Confirm and record salary payments for employees
      </p>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Paid Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>₹{p.netPay}</td>
                <td>
                  <span className={`status ${p.status.toLowerCase()}`}>
                    {p.status}
                  </span>
                </td>
                <td>{p.paidAt || "—"}</td>
                <td>
                  {p.status === "PENDING" ? (
                    <button
                      className="btn primary"
                      onClick={() => markAsPaid(index)}
                    >
                      Pay
                    </button>
                  ) : (
                    <span className="locked">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PayrollLayout>
  );
};

export default Disbursement;
