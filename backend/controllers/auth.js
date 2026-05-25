import bcrypt from "bcryptjs";
import crypto from "crypto";
import { findUserByEmail, createUser ,setUserSession} from "../models/auth.js";

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
  const sessionId = crypto.randomBytes(32).toString("hex");
    await setUserSession(user.id, sessionId);
    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        sessionId: sessionId,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};