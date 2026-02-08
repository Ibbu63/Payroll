import { useEffect, useState } from "react";
import {
  FiDownload,
  FiCheckCircle,
  FiTrendingUp,
  FiArrowDownCircle,
} from "react-icons/fi";

/* Count-up hook */
function useCountUp(end) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setValue(end);
        clearInterval(counter);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end]);

  return value;
}

const handleDownload = async (month, year) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired. Please login again.");
      return;
    }

    const res = await fetch(
      `http://localhost:5000/api/employee/payslip/download?month=${month}&year=${year}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Payslip not available");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Payslip_${month}_${year}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Failed to download payslip");
  }
};


export default function Payslips() {
  const netSalary = useCountUp(8450);
  const earnings = useCountUp(114840);
  const deductions = useCountUp(13440);

  return (
    <div className="content">
      <h1>My Payslips</h1>
      <p className="subtitle">Overview and history of your salary slips</p>

      {/* KPI CARDS (PROFESSIONAL) */}
      <div className="salary-cards">

        <div className="salary-kpi success">
          <FiCheckCircle />
          <div>
            <p>Net Salary</p>
            <h2>₹{netSalary.toLocaleString()}</h2>
            <span className="approved">Credited</span>
          </div>
        </div>

        <div className="salary-kpi info">
          <FiTrendingUp />
          <div>
            <p>Total Earnings (FY)</p>
            <h2>₹{earnings.toLocaleString()}</h2>
          </div>
        </div>

        <div className="salary-kpi danger">
          <FiArrowDownCircle />
          <div>
            <p>Total Deductions (FY)</p>
            <h2>₹{deductions.toLocaleString()}</h2>
          </div>
        </div>

      </div>

      {/* PAYSLIP HISTORY */}
      <div className="payslip-table-card">
        <h3 className="table-title">Payslip History</h3>

        <table className="payslip-history-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>January 2026</td>
              <td>₹9,570</td>
              <td className="danger">₹1,120</td>
              <td className="success">₹8,450</td>
              <td className="paid">
                <FiCheckCircle /> Paid
              </td>
              <td>
  <div className="payslip-doc">
    <button
  className="download-btn"
  onClick={() => handleDownload("January", "2026")}
>
  <FiDownload />
  <span>Download</span>
</button>

  </div>
</td>

            </tr>

            <tr>
              <td>December 2025</td>
              <td>₹9,570</td>
              <td className="danger">₹1,120</td>
              <td className="success">₹8,450</td>
              <td className="paid">
                <FiCheckCircle /> Paid
              </td>
              <td>
  <div className="payslip-doc">
   <button
  className="download-btn"
  onClick={() => handleDownload("December", "2025")}
>
  <FiDownload />
  <span>Download</span>
</button>

  </div>
</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
