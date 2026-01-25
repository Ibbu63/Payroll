import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AccessRequest from "./pages/AccessRequest";

// ADMIN
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import PayrollOversight from "./pages/admin/PayrollOversight";
import PayrollAuditLogs from "./pages/admin/PayrollAuditLogs";
import SystemSettings from "./pages/admin/SystemSettings";

// PAYROLL
import PayrollDashboard from "./pages/payroll/PayrollDashboard";
import Payslips from "./pages/payroll/Payslips";
import Disbursement from "./pages/payroll/Disbursement";
import Tax from "./pages/payroll/Tax";
import Analytics from "./pages/payroll/Analytics";

function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />

        {/* ACCESS REQUEST (PUBLIC) */}
  <Route path="/access-request" element={<AccessRequest />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* DEFAULT ADMIN PAGE */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="payroll" element={<PayrollOversight />} />
        <Route path="audit-logs" element={<PayrollAuditLogs />} />
        <Route path="settings" element={<SystemSettings />} />
        <Route path="/admin/users" element={<UserManagement />} />
      </Route>

      {/* PAYROLL */}
      <Route path="/payroll/dashboard" element={<PayrollDashboard />} />
      <Route path="/payroll/payslips" element={<Payslips />} />
      <Route path="/payroll/disbursement" element={<Disbursement />} />
      <Route path="/payroll/tax" element={<Tax />} />
      <Route path="/payroll/analytics" element={<Analytics />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
