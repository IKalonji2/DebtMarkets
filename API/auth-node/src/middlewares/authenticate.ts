import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwtUtils";
import User from "../models/user";

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // const token = req.headers.authorization?.split(" ")[1];
  console.log("Auth Node - Authorization Header:", req.headers['authorization']);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Invalid authorization header" });
  }
  const token = authHeader?.split(" ")[1];


  if (!token) {
    res.status(401).json({ error: "Access token is required" });
  }

  try {
    const payload = verifyJWT(token!);
    if (!payload) {
      res.status(401).json({ error: "Invalid or expired token" });
    }

    const user = await User.findByPk(payload.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Failed to authenticate token" });
  }
};
