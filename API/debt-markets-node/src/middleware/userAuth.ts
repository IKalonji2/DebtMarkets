import axios from "axios";
import { Request, Response, NextFunction } from "express";


const AUTH_SERVICE_URL = "http://localhost:3000/auth/validate";

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Access token is required" });
  }

  try {
    const response = await axios.post(
      AUTH_SERVICE_URL,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Check if the user object exists in the response
    if (response.data && response.data.user) {
      console.log('Response from auth service:', response.data);
      (req as any).user = response.data.user;
      console.log('what do you have', (req as any).user );
      
      next();
    } else {
      res.status(401).json({ error: "Invalid token or user data missing" });
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    res.status(401).json({ error: "Invalid or expired access token" });
  }
};


// export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     const token = req.headers.authorization?.split(" ")[1];
  
//     if (!token) {
//       res.status(401).json({ error: "Access token is required" });
//     }
  
//     try {
//       const response = await axios.post(
//         AUTH_SERVICE_URL,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       (req as any).user = response.data.user;

//       next();
//     } catch (error) {
//       console.error("Token validation failed:", error);
//       res.status(401).json({ error: "Invalid or expired access token" });
//     }
//   };
  

  export const requireRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const user = (req as any).user;
  
      if (!user) {
        res.status(401).json({ error: "User not authenticated" });
      }
  
      if (!allowedRoles.includes(user.role)) {
        res.status(403).json({ error: "Forbidden: Insufficient role" });
      }
  
      next();
    };
  };
  
