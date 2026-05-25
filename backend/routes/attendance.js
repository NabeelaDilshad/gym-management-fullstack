import express from "express";

import { getAttendance } from "../models/attendance";
import { getAttendance } from "../controllers/attendance";
const router = express.Router();

router.get("/", getAttendance);

export default router;