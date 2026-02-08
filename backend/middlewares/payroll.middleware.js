export const payrollOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const role = req.user.role?.toUpperCase();

  // ✅ ALLOW PAYROLL MANAGER + ADMIN
  if (role !== "PAYROLL_MANAGER" && role !== "admin") {
    return res.status(403).json({ message: "Payroll access only" });
  }

  next();
};
