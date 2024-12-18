import { Request, Response } from "express";
import DebtPortfolio from "../models/debt-portfolio.model";
import Auction from "../models/auction";
import Earnings from "../models/earnings";
import { Op } from "sequelize";

export const getLenderOverview = async (req: Request, res: Response): Promise<any> => {
   try {
    const lenderId = (req as any).user?.id;
    if (!lenderId) {
      return res.status(400).json({ error: "Lender ID not found in the request" });
    }

    const portfolios = await DebtPortfolio.findAll({
      where: { lenderId },
    });

    if (portfolios.length === 0) {
      return res.status(200).json({
        portfolios: [],
        auctions: [],
        earnings: [],
        message: "No portfolios found for this lender.",
      });
    }

    const portfolioIds = portfolios.map((portfolio) => portfolio.id);

    const auctions = await Auction.findAll({
      where: {
        portfolioId: {
          [Op.in]: portfolioIds,
        },
      },
    });

    const earnings = await Earnings.findAll({
      where: {
        portfolioId: {
          [Op.in]: portfolioIds,
        },
      },
    });

    return res.status(200).json({
      portfolios,
      auctions,
      earnings,
    });
  } catch (error) {
    console.error("Error fetching lender overview data:", error);
    return res.status(500).json({ error: "An unexpected error occurred while fetching lender overview data." });
  }
};
