import express, { Request, Response } from "express";
import { requireRole } from "../middleware/authMiddleware";

const router = express.Router();

// Dashboard routes
router.get("/lender-dashboard", requireRole(["lender"]), (req: Request, res: Response) => {
    res.json({ message: "Welcome, lender!" });
});

router.get("/collection-agent-dashboard", requireRole(["collector"]),(req: Request, res: Response) => {
  res.json({ message: "Welcome, collection agent!" });
});

router.get("/trader-dashboard", requireRole(["trader"]), (req: Request, res: Response) => {
  res.json({ message: "Welcome, trader!" });
});

export default router;
