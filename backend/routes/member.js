import express from "express";
import {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
} from "../controllers/member.js";



import AuthMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/",AuthMiddleware, getMembers);
router.get("/:id",AuthMiddleware, getMemberById);
router.post("/",AuthMiddleware, createMember);
router.put("/:id",AuthMiddleware, updateMember);
router.delete("/:id",AuthMiddleware, deleteMember);

export default router;