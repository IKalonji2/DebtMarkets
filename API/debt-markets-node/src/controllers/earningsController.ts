import { Request, Response } from "express";
import Earnings from "../models/earnings";
import DebtPortfolio from "../models/debtPortfolio";

export const getEarnings = async (req: Request, res: Response): Promise<any> => {
  try {
    const lenderId = (req as any).user?.id;
    if (!lenderId) {
      return res.status(400).json({ error: "Lender ID not found" });
    }

    const portfolios = await DebtPortfolio.findAll({ where: { lenderId } });
    const portfolioIds = portfolios.map((portfolio) => portfolio.id);

    const earnings = await Earnings.findAll({
      where: { portfolioId: portfolioIds },
    });

    res.json(earnings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching earnings data" });
  }
};

export const createEarning = async (req: Request, res: Response): Promise<any> => {
  try {
    const { portfolioId, amount, date } = req.body;

    if (!portfolioId || !amount || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEarning = await Earnings.create({ portfolioId, amount, date });

    res.status(201).json(newEarning);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating earning" });
  }
};
