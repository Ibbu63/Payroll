import PayrollLayout from "./PayrollLayout";
import "../../styles/payroll.css";

const Analytics = () => {
  return (
    <PayrollLayout>
      <h1>Payroll Analytics</h1>
      <p className="subtitle">
        Visual insights into payroll cost and trends
      </p>

      <div className="table-card">
        <p style={{ color: "#9ca3af" }}>
          Analytics charts will be added here.
        </p>
      </div>
    </PayrollLayout>
  );
};

export default Analytics;
