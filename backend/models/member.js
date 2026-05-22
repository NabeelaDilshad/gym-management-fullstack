import pool from "../config/db.js";

// GET ALL
export const getAllMembers = async () => {
  const result = await pool.query("SELECT * FROM members");
  return result.rows;
};

// GET BY ID
export const getMemberByIdModel = async (id) => {
  const result = await pool.query("SELECT * FROM members WHERE id=$1", [id]);
  return result.rows[0];
}; 

// CREATE
export const createMemberModel = async (
  user_name,
  email,
  phone,
  address,
  age,
  status
) => {
  const result = await pool.query(
    `INSERT INTO members(user_name, email, phone, address, age, status)
     VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [user_name, email, phone, address, age, status]
  );

  return result.rows[0];
};

// UPDATE
export const updateMemberModel = async (id, user_name) => {
  await pool.query("UPDATE members SET user_name=$1 WHERE id=$2", [
    user_name,
    id,
  ]);
};

// DELETE
export const deleteMemberModel = async (id) => {
  await pool.query("DELETE FROM members WHERE id=$1", [id]);
};
