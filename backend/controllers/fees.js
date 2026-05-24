import { getAllFees } from "../models/fees.js";

export const getFees = async (req, res) => {
  try {
    const fees = await getAllFees();
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
