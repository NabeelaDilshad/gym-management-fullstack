import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import authRouter from './routes/auth.js'
import memberRouter from './routes/member.js'
import feesRouter from './routes/fees.js'
import { formatDate , formatTime as timeformatter }   from "./utils/dateFormat.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.use("/api/members", memberRouter);
app.use("/api/fees",feesRouter);


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected");
    console.log("Current Date:", formatDate(new Date()));
    console.log("Current Time:", timeformatter(new Date()));
  } catch (err) {
    console.error("❌ Database not connected:", err.message);
  }
});
