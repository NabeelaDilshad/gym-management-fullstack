import pool from "../config/db.js";

export const getAllattendance = async () => {
   const result = await pool.query("SELECT * FROM attendance")
   return result.rows
};