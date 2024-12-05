import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwtUtils";

export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) : any => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const payload = verifyJWT(token);
    if (!payload || !allowedRoles.includes(payload["role"])) {
      return res.status(403).json({ error: "Forbidden: Insufficient role" });
    }

    next();
  };
};

