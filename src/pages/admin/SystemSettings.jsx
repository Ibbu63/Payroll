import { useEffect, useState } from "react";
import "../../styles/admin-settings.css";

export default function SystemSettings() {
  const initialSettings = {
    orgName: "Enterprise HR Pvt Ltd",
    currency: "INR",
    timezone: "Asia/Kolkata",
    financialYear: "April",
    payrollCycle: "Monthly",

    overtimeRate: 150,
    employerContribution: 12,
    taxRegime: "New",
    allowNegativePay: false,

    enableRegistration: true,
    autoApproveEmployees: false,
    requireFinalizeApproval: true,
    sessionTimeout: 30,

    enableAuditLogs: true,
    auditRetention: 90,
    allowAuditExport: true
  };

  const [settings, setSettings] = useState(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveState, setSaveState] = useState("idle"); 
  // idle | confirm | saving | saved

  // 🔍 Detect changes
  useEffect(() => {
    setHasChanges(
      JSON.stringify(settings) !== JSON.stringify(initialSettings)
    );
  }, [settings]);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaveState("saving");

    // simulate save
    setTimeout(() => {
      setSaveState("saved");
      setHasChanges(false);
    }, 800);
  };

  return (
    <div className="admin-page settings-page">
      <h2>System Settings</h2>

      {/* ORGANIZATION SETTINGS */}
      <SettingsCard title="Organization Settings">
        <input value={settings.orgName} onChange={e => handleChange("orgName", e.target.value)} />
        <select value={settings.currency} onChange={e => handleChange("currency", e.target.value)}>
          <option>INR</option><option>USD</option>
        </select>
        <select value={settings.timezone} onChange={e => handleChange("timezone", e.target.value)}>
          <option>Asia/Kolkata</option><option>UTC</option>
        </select>
        <select value={settings.financialYear} onChange={e => handleChange("financialYear", e.target.value)}>
          <option>January</option><option>April</option>
        </select>
        <select value={settings.payrollCycle} onChange={e => handleChange("payrollCycle", e.target.value)}>
          <option>Monthly</option><option>Bi-Weekly</option>
        </select>
      </SettingsCard>

      {/* PAYROLL */}
      <SettingsCard title="Payroll Configuration">
        <input type="number" value={settings.overtimeRate} onChange={e => handleChange("overtimeRate", e.target.value)} />
        <input type="number" value={settings.employerContribution} onChange={e => handleChange("employerContribution", e.target.value)} />
        <select value={settings.taxRegime} onChange={e => handleChange("taxRegime", e.target.value)}>
          <option>Old</option><option>New</option>
        </select>
        <Toggle label="Allow Negative Net Pay" checked={settings.allowNegativePay}
          onChange={v => handleChange("allowNegativePay", v)} />
      </SettingsCard>

      {/* SECURITY */}
      <SettingsCard title="Security & Access Control">
        <Toggle label="Enable New Registrations" checked={settings.enableRegistration}
          onChange={v => handleChange("enableRegistration", v)} />
        <Toggle label="Auto-Approve Employees" checked={settings.autoApproveEmployees}
          onChange={v => handleChange("autoApproveEmployees", v)} />
        <Toggle label="Require Admin Approval to Finalize Payroll" checked={settings.requireFinalizeApproval}
          onChange={v => handleChange("requireFinalizeApproval", v)} />
        <select value={settings.sessionTimeout} onChange={e => handleChange("sessionTimeout", e.target.value)}>
          <option value={15}>15 min</option><option value={30}>30 min</option><option value={60}>60 min</option>
        </select>
      </SettingsCard>

      {/* AUDIT */}
      <SettingsCard title="Audit & Compliance">
        <Toggle label="Enable Audit Logs" checked={settings.enableAuditLogs}
          onChange={v => handleChange("enableAuditLogs", v)} />
        <select value={settings.auditRetention} onChange={e => handleChange("auditRetention", e.target.value)}>
          <option value={30}>30 Days</option>
          <option value={90}>90 Days</option>
          <option value={365}>1 Year</option>
        </select>
        <Toggle label="Allow Audit Export" checked={settings.allowAuditExport}
          onChange={v => handleChange("allowAuditExport", v)} />
      </SettingsCard>

      {/* SAVE BAR */}
      <div className={`settings-footer ${hasChanges ? "active" : ""}`}>
        {saveState === "saved" ? (
          <span className="saved-text">✔ Settings saved</span>
        ) : (
          <>
            <span className="unsaved-text">You have unsaved changes</span>
            <button
              className="primary-btn"
              disabled={!hasChanges || saveState === "saving"}
              onClick={handleSave}
            >
              {saveState === "saving" ? "Saving..." : "Save Settings"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---- small helpers ---- */

function SettingsCard({ title, children }) {
  return (
    <div className="settings-card">
      <h3>{title}</h3>
      <div className="form-grid">{children}</div>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
