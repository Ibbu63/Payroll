import { useState } from "react";
import "../styles/AccessRequest.css";

const AccessRequest = () => {
  const [role, setRole] = useState("");

  return (
    <div className="access-wrapper">
      <div className="access-card">
        <h1 className="title">Access Request Form</h1>
        <p className="subtitle">
          Submit your details for workspace authorization
        </p>

        {/* PERSONAL INFORMATION */}
        <div className="section">
          <span className="section-title">PERSONAL INFORMATION</span>

          <label>Full Name</label>
          <input type="text" placeholder="Enter Name" />

          <div className="row">
            <div>
              <label>Work Email</label>
              <input type="email" placeholder="Enter Work email" />
            </div>
            <div>
              <label>Mobile Number</label>
              <input type="tel" placeholder="Mobile Number" />
            </div>
          </div>
        </div>

        {/* ORGANIZATION INFORMATION */}
        <div className="section">
          <span className="section-title">ORGANIZATION INFORMATION</span>

          <label>Organization Name</label>
          <input type="text" placeholder="ZOHO Corporation" />

          <div className="row">
            <div>
              <label>Employee ID</label>
              <input type="text" placeholder="Employee id" />
            </div>
            <div>
              <label>Department</label>
              <select>
                <option>Select Department</option>
                <option>HR</option>
                <option>Payroll</option>
                <option>Finance</option>
                <option>IT</option>
              </select>
            </div>
          </div>
        </div>

        {/* ACCESS DETAILS */}
        <div className="section">
          <span className="section-title">ACCESS DETAILS</span>

          <label>Requested Role</label>
          <div className="role-buttons">
            {["Employee", "HR Manager", "Payroll Manager"].map((r) => (
              <button
                key={r}
                className={role === r ? "role active" : "role"}
                onClick={() => setRole(r)}
                type="button"
              >
                {r}
              </button>
            ))}
          </div>

          <label>Reason for Access</label>
          <textarea placeholder="Please describe why you require these permissions..." />
        </div>

        <button className="submit-btn">
          Submit Access Request →
        </button>

        <p className="footer-text">
          By submitting, you agree to the <span>Security Protocol</span> and{" "}
          <span>Data Usage Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default AccessRequest;
