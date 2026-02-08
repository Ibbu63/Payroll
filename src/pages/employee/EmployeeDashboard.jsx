import SalaryLineChart from "../components/SalaryLineChart";
import StatsTable from "../components/StatsTable";
import "./Employee.css";
import { FiCheckCircle } from "react-icons/fi";

export default function EmployeeDashboard() {
  return (
    <div className="employee-dashboard">
      {/* TOP SECTION */}
      <div className="dashboard-layout">
        <StatsTable />

        <div className="graph-card">
          <h3>Salary Growth</h3>
          <SalaryLineChart />
        </div>
      </div>

      {/* BOTTOM */}
      <div className="payslip-card">
        <h3>Recent Payslips</h3>

        <table className="payslip-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Net Pay</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>January 2026</td>
              <td>$8,450.00</td>
              <td className="paid">
                <FiCheckCircle /> Paid
              </td>
            </tr>
             <tr>
              <td>December 2025</td>
              <td>$8,450.00</td>
              <td className="paid">
                <FiCheckCircle /> Paid
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
