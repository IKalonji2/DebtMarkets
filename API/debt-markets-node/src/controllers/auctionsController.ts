import { Request, Response } from "express";

import Auction from "../models/auction";
import DebtPortfolio from "../models/debtPortfolio";

export const getActiveAuctions = async (req: Request, res: Response): Promise<void> => {
  try {
    const auctions = await Auction.findAll({
      where: { status: 'active' },
      include: [
        {
          model: DebtPortfolio,
          required: true,
          where: { status: "active" }, 
        },
      ],
    });

    if (auctions.length === 0) {
      res.status(204).json({ message: 'No active auctions found' });
      return;
    }

    res.status(200).json(auctions);
  } catch (error) {
    console.error('Error fetching active auctions:', error);
    res.status(500).json({ error: 'Failed to fetch active auctions.' });
  }
};


export const getClosedAuctions = async (req:Request, res:Response) => {
  try {
    const auctions = await Auction.findAll({
      where: { status: "closed" },
      include: [{
        model: DebtPortfolio,
        required: true,
      }],
    });

    res.status(200).json(auctions);
  } catch (error) {
    console.error("Error fetching closed auctions:", error);
    res.status(500).json({ error: "Failed to fetch closed auctions." });
  }
};

export const putPortfolioForAuction = async (req: Request, res: Response): Promise<void> => {
  const { portfolioId } = req.body;
  const lenderId = (req as any).user.id;

  try {
    const portfolio = await DebtPortfolio.findOne({
      where: { id: portfolioId, lenderId, status: "tokenized" },
    });

    if (!portfolio) {
      res.status(400).json({ error: "Portfolio not eligible for auction." });
      return;
    }

    // Update portfolio status
    portfolio.status = "onAuction";
    await portfolio.save();

    // Create auction entry
    const auction = await Auction.create({
      portfolioId,
      startDate: new Date(),
      status: "active",
    });

    res.status(201).json({
      message: "Portfolio is now up for auction.",
      auction,
    });
  } catch (error) {
    console.error("Error putting portfolio up for auction:", error);
    res.status(500).json({ error: "Failed to put portfolio up for auction." });
  }
};
