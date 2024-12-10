import express, { Request, Response } from "express";
import { requireRole, validateToken } from "../middlewares/authenticate";
import Auction from "../models/auction";
import DebtPortfolio from "../models/debtPortfolio";

const router = express.Router();

// Start an auction
router.post("/auctions", validateToken, async (req: Request, res: Response) : Promise<void> => {
  try {
    const { portfolioId, startTime, endTime } = req.body;

    const portfolio = await DebtPortfolio.findByPk(portfolioId);
    const userId = (req as any).user?.id;

    if (!portfolio || portfolio.lenderId !== userId) {
      res.status(404).json({ error: "Portfolio not found or unauthorized" });
    }

    const auction = await Auction.create({
      portfolioId,
      startTime,
      endTime,
    });

    portfolio!.status = "onAuction";
    await portfolio!.save();

    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ error: "Error starting auction" });
  }
});

export default router;
