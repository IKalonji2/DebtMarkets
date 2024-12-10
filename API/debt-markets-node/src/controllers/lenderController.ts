import { Request, Response } from "express";
import DebtPortfolio from "../models/debtPortfolio";
import Auction from "../models/auction";
import Earnings from "../models/earnings";

export const getLenderOverview = async (req: Request, res: Response): Promise<any> => {
  console.log('User in request:', (req as any).user);
  try {
    const lenderId = (req as any).user?.id;
    if (!lenderId) {
      return res.status(400).json({ error: "Lender ID not found" });
    }

    const portfolios = await DebtPortfolio.findAll({ where: { lenderId } });

    const portfolioIds = portfolios.map((portfolio) => portfolio.id);
    const auctions = await Auction.findAll({ where: { portfolioId: portfolioIds } });
    const earnings = await Earnings.findAll({ where: { portfolioId: portfolioIds } });

    res.json({
      portfolios,
      auctions,
      earnings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching lender overview data" });
  }
};
