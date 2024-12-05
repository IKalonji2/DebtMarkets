import express, { Request, Response } from "express";
import User from "../models/user";
import { hashPassword, verifyPassword } from "../utils/hashUtils";
import { createJWT } from "../utils/jwtUtils";
import UserDetails from "../models/userDetails";

const router = express.Router();

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, role = "trader", additionalInfo } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    if (role && !["lender", "collector", "trader"].includes(role)) {
      return res.status(400).json({ error: "Invalid role specified" });
    }

    if ((role === "lender" || role === "collector") && !additionalInfo) {
      return res.status(400).json({ error: "Additional information is required for this role." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ name, email, hashedPassword, role });

    // Include role in the JWT payload
    const token = createJWT({ id: newUser.id, email: newUser.email, role: newUser.role });

    if (role !== "trader" && additionalInfo) {
      await UserDetails.create({
        userId: newUser.id,
        additionalInfo,
      });
    }

    return res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      accessToken: token,
    });
  } catch (error) {
    console.error("Error in user registration:", error); // Add this log for debugging
    return res.status(500).json({ error: error || "An error occurred while registering the user." });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isPasswordValid = await verifyPassword(password, user.hashedPassword);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Include role in the JWT payload
  const token = createJWT({ id: user.id, email: user.email, role: user.role });

  return res.json({ accessToken: token, role: user.role });
});

export default router;
