import express from "express";
import { getFees } from "../controllers/fees.js";

const router = express.Router();

router.get("/", getFees);

export default router;