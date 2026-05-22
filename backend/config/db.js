import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "nabeeladilshad",
  host: "localhost",
  database: "gymmanagment",
  password: "nabeela@000",
  port: 5432,
});

export default pool;