import pool from "../config/db.js";

export const getAllFees = async () => {
  const result = await pool.query("SELECT * FROM fees");
  return result.rows;
};