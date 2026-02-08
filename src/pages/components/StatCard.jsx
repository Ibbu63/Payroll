export default function StatCard({ title, value, trend, trendType, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div>
          <p className="stat-title">{title}</p>
          <h2 className="stat-value">{value}</h2>
        </div>

        <div className={`stat-icon ${trendType}`}>
          {icon}
        </div>
      </div>

      <div className={`stat-trend ${trendType}`}>
        {trendType === "up" ? "▲" : "▼"} {trend}
      </div>
    </div>
  );
}
