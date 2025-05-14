const jwt = require("jsonwebtoken");

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ⬅️ Save decoded payload
    next();
  } catch (err) {
    console.error("[AUTH ERROR]", err.message);
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required." });
  }
  next();
};

module.exports = {verifyTokenMiddleware,verifyAdmin};