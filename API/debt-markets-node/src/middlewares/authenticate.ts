import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Invalid authorization header" });
  }
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  try {
    const response = await axios.post("http://localhost:3000/auth/verify", { token });

    if (!response.data.valid) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    (req as any).user = response.data.payload;
    console.log("do you have user id ? ",response.data.payload)
    next();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Authentication error:", error.response?.data || error.message);
      return res.status(500).json({ error: "Authentication failed" });
    } else {
      console.error("Unexpected error:", (error as Error).message);
      return res.status(500).json({ error: "Unexpected error occurred" });
    }
  }
};

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user && (req as any).user.role === role) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  };
};

export const validateToken = authenticate;
