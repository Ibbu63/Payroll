import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayrollSidebar from "./PayrollSidebar";
import "../../styles/payroll.css";

const PayrollLayout = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // 🔐 Backend is source of truth
    if (!token || role !== "PAYROLL_MANAGER") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="payroll-layout">
      <PayrollSidebar />
      <main className="payroll-main">{children}</main>
    </div>
  );
};

export default PayrollLayout;
