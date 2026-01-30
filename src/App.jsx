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

// HR
import HRLayout from "./pages/hr/HRLayout";
import HRDashboard from "./pages/hr/HRDashboard";
import Employees from "./pages/hr/Employees";
import Approvals from "./pages/hr/Approvals";
import Loans from "./pages/hr/Loans";
import Reports from "./pages/hr/Reports";
import Requests from "./pages/hr/Requests";


function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<Login />} />

      {/* ACCESS REQUEST (PUBLIC) */}
      <Route path="/access-request" element={<AccessRequest />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="payroll" element={<PayrollOversight />} />
        <Route path="audit-logs" element={<PayrollAuditLogs />} />
        <Route path="settings" element={<SystemSettings />} />
      </Route>

      {/* PAYROLL */}
      <Route path="/payroll/dashboard" element={<PayrollDashboard />} />
      <Route path="/payroll/payslips" element={<Payslips />} />
      <Route path="/payroll/disbursement" element={<Disbursement />} />
      <Route path="/payroll/tax" element={<Tax />} />
      <Route path="/payroll/analytics" element={<Analytics />} />

      {/* HR */}
      <Route path="/hr" element={<HRLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<HRDashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="loans" element={<Loans />} />
        <Route path="reports" element={<Reports />} />
        <Route path="requests" element={<Requests />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
