import Token from "../models/collector/token";
import { Request,Response } from "express";

export const getOwnedTokens = async (req:Request, res:Response): Promise<any> => {
  const userId = (req as any).user?.id; 
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const tokens = await Token.findAll({ where: { ownerId: userId } });
    res.json(tokens);
  } catch (error) {
    console.error("Error fetching owned tokens:", error);
    res.status(500).json({ message: "Failed to fetch owned tokens" });
  }
};

export const getValueTrends = async (req:Request, res:Response): Promise<any> => {
  const userId = (req as any).user?.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Mock example: Fetch value trends from a database or analytics engine
    const trends = [
      { date: "2024-12-01", value: 1000 },
      { date: "2024-12-05", value: 1200 },
      { date: "2024-12-10", value: 1100 },
    ];
    res.json(trends);
  } catch (error) {
    console.error("Error fetching value trends:", error);
    res.status(500).json({ message: "Failed to fetch value trends" });
  }
};
