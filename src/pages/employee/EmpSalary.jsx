import {
  FiTrendingUp,
  FiArrowDownCircle,
  FiDollarSign,
} from "react-icons/fi";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip);

export default function EmpSalary() {
  const gross = 9570;
  const deductions = 1120;
  const net = gross - deductions;
  const netPercent = Math.round((net / gross) * 100);

  const chartData = {
    labels: ["Net Salary", "Deductions"],
    datasets: [
      {
        data: [net, deductions],
        backgroundColor: ["#22c55e", "#334155"],
        borderWidth: 0,
        cutout: "78%", // 🔥 thinner donut
      },
    ],
  };

  const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false, // 🔥 prevents resize loops
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `₹${ctx.raw.toLocaleString()}`,
      },
    },
  },
};

  return (
    <div className="content">
      <h1>Salary Breakup</h1>
      <p className="subtitle">Detailed view of your salary components</p>

      {/* KPI CARDS */}
      <div className="salary-cards">
        <div className="salary-kpi info">
          <FiTrendingUp />
          <div>
            <p>Gross Salary</p>
            <h2>₹{gross.toLocaleString()}</h2>
          </div>
        </div>

        <div className="salary-kpi danger">
          <FiArrowDownCircle />
          <div>
            <p>Total Deductions</p>
            <h2>₹{deductions.toLocaleString()}</h2>
          </div>
        </div>

        <div className="salary-kpi success">
          <FiDollarSign />
          <div>
            <p>Net Salary</p>
            <h2>₹{net.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* VISUAL + TABLES */}
      <div className="salary-visual-grid">

        {/* PROFESSIONAL DONUT */}
        <div className="salary-chart-card compact">
          <h3>Net Pay Ratio</h3>

          <div className="donut-wrapper">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="donut-center">
              <span className="percent">{netPercent}%</span>
              <span className="label">Net Pay</span>
            </div>
          </div>
        </div>

        {/* EARNINGS */}
        <div className="salary-card">
          <h3>Earnings</h3>
          <table className="salary-table">
            <tbody>
              <tr><td>Basic Salary</td><td>₹30,000</td></tr>
              <tr><td>HRA</td><td>₹10,000</td></tr>
              <tr><td>Allowances</td><td>₹5,000</td></tr>
              <tr className="total-row">
                <td>Total Earnings</td>
                <td>₹45,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DEDUCTIONS */}
        <div className="salary-card">
          <h3>Deductions</h3>
          <table className="salary-table">
            <tbody>
              <tr><td>PF</td><td>₹1,800</td></tr>
              <tr><td>Professional Tax</td><td>₹200</td></tr>
              <tr><td>Income Tax</td><td>₹3,000</td></tr>
              <tr className="total-row danger">
                <td>Total Deductions</td>
                <td>₹5,000</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
