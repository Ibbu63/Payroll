import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  // 1️⃣ Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 2️⃣ Role mismatch (case-consistent check)
  if (role && storedRole !== role) {
    return <Navigate to="/" replace />;
  }

  // 3️⃣ All checks passed
  return children;
}
