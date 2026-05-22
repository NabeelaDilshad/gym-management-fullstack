import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../models/auth.js";

// SIGNUP
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(username, email, hashedPassword);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};