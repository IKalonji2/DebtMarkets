import express, { Request, Response } from "express";
import { validateToken, requireRole } from "../middleware/userAuth";
import DebtPortfolio from "../models/debtPortfolio";

const router = express.Router();

router.get(
  "/portfolios",
  validateToken,
  requireRole(["lender"]),
  async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const portfolios = await DebtPortfolio.findAll({ where: { lenderId: user?.id } });
        res.json(portfolios);
    } catch (error) {
      res.status(500).json({ error: "Error fetching portfolios" });
    }
  }
);

export default router;
