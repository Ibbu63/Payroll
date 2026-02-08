export const hrOnly = (req, res, next) => {
  try {
    // protect middleware MUST run before this
    if (!req.user) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const allowedRoles = ["HR", "ADMIN"];

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: HR only"
      });
    }

    next();
  } catch (error) {
    console.error("❌ HR MIDDLEWARE ERROR:", error.message);
    return res.status(403).json({ message: "HR access failed" });
  }
};
