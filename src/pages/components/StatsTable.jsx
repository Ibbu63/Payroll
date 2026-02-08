import {
  FiDollarSign,
  FiPercent,
  FiTrendingUp
} from "react-icons/fi";

export default function StatsTable() {
  return (
    <div className="stats-table">
      <div className="stats-row">
        <div className="stats-left">
          <FiDollarSign className="stats-icon salary" />
          <span>Net Salary</span>
        </div>
        <div className="stats-right up">
          $8,450 <span>▲ 5.2%</span>
        </div>
      </div>

      <div className="stats-row">
        <div className="stats-left">
          <FiPercent className="stats-icon tax" />
          <span>Tax Deducted</span>
        </div>
        <div className="stats-right down">
          $1,120 <span>▼ 2.1%</span>
        </div>
      </div>

      <div className="stats-row">
        <div className="stats-left">
          <FiTrendingUp className="stats-icon invest" />
          <span>Investments</span>
        </div>
        <div className="stats-right neutral">
          $2,500 <span>● 0.0%</span>
        </div>
      </div>
    </div>
  );
}
