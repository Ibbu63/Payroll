import {
  FaPlay,
  FaUserPlus,
  FaFileInvoice,
  FaShieldAlt
} from "react-icons/fa";

export default function QuickActions() {
  return (
    <div className="card quick-actions">
      <h3>Quick Actions</h3>

      <button>
        <FaPlay /> Run Payroll Cycle
      </button>

      <button>
        <FaUserPlus /> Approve Access Requests
      </button>

      <button>
        <FaFileInvoice /> Generate Reports
      </button>

      <button>
        <FaShieldAlt /> Review Compliance
      </button>
    </div>
  );
}
