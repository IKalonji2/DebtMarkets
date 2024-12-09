import { Request, Response } from "express";
import { verifyJWT } from "../utils/jwtUtils";
import User from "../models/user";

const validateToken = async (req: Request, res: Response): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token is required" });
  }

  try {
    const payload = verifyJWT(token);

    if (!payload) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const user = await User.findByPk(payload.id, {
      attributes: ["id", "name", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Token validation error:", error);
    res.status(500).json({ error: "Failed to validate token" });
  }
};

export default validateToken;
