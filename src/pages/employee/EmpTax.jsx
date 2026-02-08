import { useState } from "react";
import {
  FiShield,
  FiTrendingDown,
  FiCalendar,
  FiFileText,
  FiDownload,
} from "react-icons/fi";

export default function EmpTax() {
  const [downloading, setDownloading] = useState(false);

  // 🔥 NEW STATE
  const [financialYear, setFinancialYear] = useState("2024–25");
  const [regime, setRegime] = useState("New");

  // Demo values (frontend only)
  const taxPaid =
    regime === "New" ? "₹85,000" : "₹72,000";

  const handleDownload = async () => {
    try {
      setDownloading(true);

      const res = await fetch(
        "http://localhost:5000/api/employee/tax/form16",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Form16.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download Form 16");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="content">
      <h1>Tax Overview</h1>
      <p className="subtitle">Your income tax summary and deductions</p>

      {/* FILTERS */}
      <div className="tax-filter modern">
        <select
          value={financialYear}
          onChange={(e) => setFinancialYear(e.target.value)}
        >
          <option value="2024–25">FY 2024 – 2025</option>
          <option value="2023–24">FY 2023 – 2024</option>
        </select>

        <select
          value={regime}
          onChange={(e) => setRegime(e.target.value)}
        >
          <option value="New">New Regime</option>
          <option value="Old">Old Regime</option>
        </select>
      </div>

      {/* SUMMARY CARDS */}
      <div className="tax-summary-cards">
        <div className="tax-card purple">
          <FiCalendar />
          <div>
            <p>Financial Year</p>
            <h2>{financialYear}</h2>
          </div>
        </div>

        <div className="tax-card amber">
          <FiTrendingDown />
          <div>
            <p>Total Tax Paid</p>
            <h2>{taxPaid}</h2>
          </div>
        </div>

        <div className="tax-card cyan">
          <FiShield />
          <div>
            <p>Tax Regime</p>
            <h2>{regime}</h2>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="tax-table-modern">
        <h3>Monthly Tax Deduction</h3>

        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Gross</th>
              <th>Tax</th>
              <th>Net</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>January</td>
              <td>₹9,570</td>
              <td className="tax-red">
                {regime === "New" ? "₹1,120" : "₹900"}
              </td>
              <td className="tax-green">₹8,450</td>
            </tr>
            <tr>
              <td>December</td>
              <td>₹9,570</td>
              <td className="tax-red">
                {regime === "New" ? "₹1,120" : "₹900"}
              </td>
              <td className="tax-green">₹8,450</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* DOCUMENT */}
      <div className="tax-doc-modern">
        <div className="doc-left">
          <FiFileText className="doc-icon" />
          <div className="doc-info">
            <h4>Form 16</h4>
            <p>
              Income Tax Certificate • {financialYear} • {regime} Regime
            </p>
          </div>
        </div>

        <button
          className="download-btn primary"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? (
            <>
              <span className="spinner" />
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <FiDownload />
              <span>Download DOCX</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
