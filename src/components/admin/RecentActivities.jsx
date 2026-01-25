import {
  FaUserPlus,
  FaMoneyCheckAlt,
  FaExclamationTriangle,
  FaFileAlt
} from "react-icons/fa";

export default function RecentActivities() {
  const activities = [
    {
      icon: <FaUserPlus />,
      title: "New employee onboarded",
      desc: "Sarah Jenkins • Design Team",
      time: "2 mins ago"
    },
    {
      icon: <FaMoneyCheckAlt />,
      title: "Payroll cycle initiated",
      desc: "Q3 Bonus Pool • 42 employees",
      time: "45 mins ago"
    },
    {
      icon: <FaExclamationTriangle />,
      title: "Compliance alert",
      desc: "Form 1099-NEC missing",
      time: "3 hours ago",
      alert: true
    },
    {
      icon: <FaFileAlt />,
      title: "Monthly report generated",
      desc: "August_Final_v2.pdf",
      time: "5 hours ago"
    }
  ];

  return (
    <div className="card recent-activities">
      <div className="card-header">
        <h3>
          Recent Activities <span className="live-badge">Live</span>
        </h3>
      </div>

      <div className="activity-list">
        {activities.map((item, i) => (
          <div
            key={i}
            className={`activity-item ${item.alert ? "alert" : ""}`}
          >
            <div className="activity-icon">{item.icon}</div>

            <div className="activity-content">
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </div>

            <span className="activity-time">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
