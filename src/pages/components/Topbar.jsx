import { FiDownload } from "react-icons/fi";

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
export default function Topbar() {
  return (
    <div className="topbar">
      {/* Left breadcrumb */}
      <div className="breadcrumb">
        <span>Enterprise</span>
        <span className="slash">/</span>
        <span>Dashboard</span>
      </div>

      {/* Right actions */}
      <div className="top-actions">
        <div className="search-box">
          <input type="text" placeholder="Search records..." />
        </div>

        <div className="payslip-doc">
            <button
          className="btn-primary" 
          onClick={() => handleDownload("January", "2026")}
        >
          <FiDownload />
          <span>Download</span>
        </button>
          </div>

        <button className="btn-primary">
          ＋ Declare Investment
        </button>

        
      </div>
    </div>
  );
}
