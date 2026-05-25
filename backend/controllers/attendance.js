import { getAllattendance } from "../models/attendance.js";


export const getAttendance = async (req, res) => {
  try {
    const attendance = await getAllattendance();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
