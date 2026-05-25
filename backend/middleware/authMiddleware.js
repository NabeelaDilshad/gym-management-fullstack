
import pool from "../config/db.js";
const authMiddleware = async (req, res, next) => {
  console.log("Middleware Executed");

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing"
    });
  }

  const token = authHeader
    .split(" ")[1].replace(/"/g, ""); // Remove any quotes around the token

  console.log("Token:", token);

  // verify this token with the database
  const result = await pool.query(
    "SELECT * FROM users WHERE session_id = $1",
    [token]
  );
  const userSession = result.rows[0];

  console.log("User Session Found:", userSession);

  if (!userSession) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }

  req.user = userSession;

  next();
};

export default authMiddleware;