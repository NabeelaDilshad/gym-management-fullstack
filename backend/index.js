import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import authRouter from './routes/auth.js'
import memberRouter from './routes/member.js'
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.use("/api/members", memberRouter);


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database not connected:", err.message);
  }
});
