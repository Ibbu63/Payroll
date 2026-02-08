import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AccessRequest from "./pages/AccessRequest";
import ProtectedRoute from "./auth/ProtectedRoute";

/* ================= ADMIN ================= */
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import PayrollOversight from "./pages/admin/PayrollOversight";
import PayrollAuditLogs from "./pages/admin/PayrollAuditLogs";
import SystemSettings from "./pages/admin/SystemSettings";

/* ================= PAYROLL ================= */
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

/* ================= EMPLOYEE ================= */
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmpPayslips from "./pages/employee/EmpPayslips";
import EmpSalary from "./pages/employee/EmpSalary";
import EmpTax from "./pages/employee/EmpTax";
import EmpInvestments from "./pages/employee/EmpInvestments";
import EmpProfile from "./pages/employee/EmpProfile";

import Sidebar from "./pages/components/Sidebar";
import Topbar from "./pages/components/Topbar";
import { Outlet } from "react-router-dom";

function EmployeeLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-content">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}



function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Login />} />
      <Route path="/access-request" element={<AccessRequest />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="payroll" element={<PayrollOversight />} />
        <Route path="audit-logs" element={<PayrollAuditLogs />} />
        <Route path="settings" element={<SystemSettings />} />
      </Route>

      {/* ================= PAYROLL ================= */}
      <Route
        path="/payroll/dashboard"
        element={
          <ProtectedRoute role="PAYROLL_MANAGER">
            <PayrollDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payroll/payslips"
        element={
          <ProtectedRoute role="PAYROLL_MANAGER">
            <Payslips />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payroll/disbursement"
        element={
          <ProtectedRoute role="PAYROLL_MANAGER">
            <Disbursement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payroll/tax"
        element={
          <ProtectedRoute role="PAYROLL_MANAGER">
            <Tax />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payroll/analytics"
        element={
          <ProtectedRoute role="PAYROLL_MANAGER">
            <Analytics />
          </ProtectedRoute>
        }
      />


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


      {/* ================= EMPLOYEE ================= */}
      <Route
  path="/employee"
  element={
    <ProtectedRoute role="EMPLOYEE">
      <EmployeeLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Navigate to="dashboard" replace />} />
  <Route path="dashboard" element={<EmployeeDashboard />} />
  <Route index element={<Navigate to="dashboard" replace />} />
         <Route path="dashboard" element={<EmployeeDashboard />} />
  <Route path="payslips" element={<EmpPayslips />} />
  <Route path="salary" element={<EmpSalary />} />
  <Route path="tax" element={<EmpTax />} />
  <Route path="investments" element={<EmpInvestments />} />
  <Route path="profile" element={<EmpProfile />} />
</Route>


      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
