export default function StatCard({ title, value, sub, badge, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div className="stat-content">
        <div className="stat-header">
          <span>{title}</span>
          {badge && <span className="badge danger">{badge}</span>}
        </div>

        <h2>{value}</h2>
        {sub && <p className="stat-sub">{sub}</p>}
      </div>
    </div>
  );
}
