import {
  getAllMembers,
  getMemberByIdModel,
  updateMemberModel,
  deleteMemberModel,
  createMemberModel,
} from "../models/member.js";

// GET ALL
export const getMembers = async (req, res) => {
  try {
    const members = await getAllMembers();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
export const getMemberById = async (req, res) => {
  try {
    const member = await getMemberByIdModel(req.params.id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json([member]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE (FIXED ✅)
export const createMember = async (req, res) => {
  try {
    const { user_name, email, phone, address, age , status } = req.body;

    if (!user_name || !email) {
      return res.status(400).json({
        message: "Username and email are required",
      });
    }

    const newMember = await createMemberModel(
      user_name,
      email,
      phone,
      address,
      age,
      status
    );

    res.status(201).json({
      message: "Member created successfully",
      data: newMember,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateMember = async (req, res) => {
  try {
    const { user_name, email, phone, address, age , status , health_issue, join_date, } = req.body;

    await updateMemberModel(req.params.id, user_name, email, phone, address, age , status ,health_issue , join_date);

    res.json({ message: "Member updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteMember = async (req, res) => {
  try {
    await deleteMemberModel(req.params.id);

    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
