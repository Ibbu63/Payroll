import {
  FiPieChart,
  FiCheckCircle,
  FiClock,
  FiShield,
} from "react-icons/fi";

export default function Investments() {
  return (
    <div className="content">
      <h1>Investments</h1>
      <p className="subtitle">Your declared investments for tax savings</p>

      {/* SUMMARY CARDS */}
      <div className="investment-summary">

        <div className="investment-card green">
          <FiPieChart />
          <div>
            <p>Total Declared</p>
            <h2>₹1,75,000</h2>
          </div>
        </div>

        <div className="investment-card blue">
          <FiCheckCircle />
          <div>
            <p>Approved</p>
            <h2>₹1,50,000</h2>
          </div>
        </div>

        <div className="investment-card pink">
          <FiClock />
          <div>
            <p>Pending</p>
            <h2>₹25,000</h2>
          </div>
        </div>

      </div>

      {/* INVESTMENT DETAILS */}
      <div className="investment-list">

        {/* 80C */}
        <div className="investment-item">
          <div className="investment-header">
            <div className="left">
              <FiShield className="icon green" />
              <div>
                <h4>Section 80C</h4>
                <p>Max Limit ₹1,50,000</p>
              </div>
            </div>
            <span className="status approved">Approved</span>
          </div>

          <div className="investment-values">
            <span>Declared: ₹1,50,000</span>
            <span>Remaining: ₹0</span>
          </div>

          <div className="progress-bar">
            <div className="progress fill"></div>
          </div>
        </div>

        {/* 80D */}
        <div className="investment-item">
          <div className="investment-header">
            <div className="left">
              <FiShield className="icon pink" />
              <div>
                <h4>Section 80D</h4>
                <p>Health Insurance</p>
              </div>
            </div>
            <span className="status pending">Pending</span>
          </div>

          <div className="investment-values">
            <span>Declared: ₹25,000</span>
            <span>Remaining: ₹25,000</span>
          </div>

          <div className="progress-bar">
            <div className="progress half"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
