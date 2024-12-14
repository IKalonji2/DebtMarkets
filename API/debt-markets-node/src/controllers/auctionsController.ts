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
