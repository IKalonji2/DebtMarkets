import express, { Request, Response } from "express";
import { requireRole } from "../middleware/userAuth";
import DebtPortfolio from "../models/debtPortfolio";

const router = express.Router();

// Add a new portfolio
router.post("/portfolios", requireRole(["lender"]), async (req: Request, res: Response) => {
  try {
    const { name, description, value } = req.body;
    const lenderId = (req as any).user?.id;

    const portfolio = await DebtPortfolio.create({
      lenderId,
      name,
      description,
      value,
    });

    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: "Error creating portfolio" });
  }
});

// Get portfolios for a lender
router.get("/portfolios", requireRole(["lender"]), async (req: Request, res: Response) : Promise<void> => {
  try {
    const lenderId = (req as any).user?.id;
    if (!lenderId) {
      res.status(400).json({ error: "Lender ID not found" });
    }

    const portfolios = await DebtPortfolio.findAll({ where: { lenderId } });
    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: "Error fetching portfolios" });
  }
});

export default router;
