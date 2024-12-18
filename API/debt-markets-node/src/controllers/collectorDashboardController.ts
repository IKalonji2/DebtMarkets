import { Request, Response } from "express";
import Auction from "../models/auction";
import Recovery from "../models/collector/recovery";
import Token from "../models/collector/token";
import Update from "../models/collector/update";
import { Op } from "sequelize";
import DebtPortfolio from "../models/debt-portfolio.model";
import { ActiveBid } from "../models/collector/activeBids";
import Bid from "../models/collector/bid";

export const getCollectorOverview = async (req: Request, res: Response): Promise<any> => {
  try {
    const collectorId = (req as any).user?.id;
    if (!collectorId) {
      return res.status(400).json({ error: "Collector ID not found in the request" });
    }

    const activeBids = await Auction.findAll({
      where: {
        collectorId,
        status: "active",
      },
      attributes: ["id", "portfolioId", "bidAmount", "status", "createdAt"],
    });

    const totalRecoveries = await Recovery.sum("amountRecovered", {
      where: { collectorId },
    });

    const tokensOwned = await Token.findAll({
      where: { collectorId },
      attributes: ["portfolioId", "numTokens", "tokenValue"],
    });

    const recentUpdates = await Update.findAll({
      where: { collectorId },
      limit: 10,
      order: [["createdAt", "DESC"]],
      attributes: ["title", "message", "createdAt"],
    });

    return res.status(200).json({
      activeBids,
      totalRecoveries: totalRecoveries || 0,
      tokensOwned,
      recentUpdates,
    });
  } catch (error) {
    console.error("Error fetching collector overview data:", error);
    return res.status(500).json({ error: "An unexpected error occurred while fetching collector overview data." });
  }
};

export const getCollectorActiveAuctions = async (req: Request, res: Response) => {
  const collectorId = (req as any).user.id;

  try {
    const auctions = await Auction.findAll({
      where: { collectorId, status: "active" },
      include: [{ model: DebtPortfolio, required: true }],
    });

    if (!auctions.length) {
      return res.status(204).json({ message: "No active auctions found for this collector." });
    }

    return res.status(200).json(auctions);
  } catch (error) {
    console.error("Error fetching collector active auctions:", error);
    return res.status(500).json({ error: "Failed to fetch auctions." });
  }
};


// Get all active bids
export const getActiveBids = async (req: Request, res: Response): Promise<any> => {
  const collectorId = (req as any).user?.id;
  console.log('Collector ID:', collectorId);

  if (!collectorId) {
    return res.status(400).json({ error: "Collector ID is required" });
  }

  try {
    const activeBids = await ActiveBid.findAll({
      where: { collectorId, status: 'active' },
    });

    if (!activeBids || activeBids.length === 0) {
      return res.status(204).json({ message: "No active bids found" });
    }

    console.log('Fetched active bids:', activeBids);
    return res.status(200).json(activeBids);
  } catch (error) {
    console.error('Error fetching active bids:', error);
    return res.status(500).json({ error: 'Failed to fetch active bids' });
  }
};

// Place a new bid
export const placeBid = async (req: Request, res: Response) => {
  const { bidId, amount } = req.body;
  const collectorId = (req as any).user.id;

  if (!bidId || !amount) {
    return res.status(400).json({ error: 'bidId and amount are required' });
  }

  try {
    // Check if auction is active
    const auction = await Auction.findOne({ where: { id: bidId, status: 'active' } });
    if (!auction) {
      return res.status(404).json({ error: 'Auction not found or not active' });
    }

    // Check if the bid already exists
    const existingBid = await Bid.findOne({ where: { bidId, collectorId } });
    if (existingBid) {
      return res.status(400).json({ error: 'You have already placed a bid for this auction' });
    }

    const bid = await Bid.create({ bidId, amount, collectorId, status: 'placed' });
    return res.status(201).json(bid);
  } catch (error) {
    console.error('Error placing bid:', error);
    return res.status(500).json({ error: 'Failed to place bid' });
  }
};


// Cancel a bid
export const cancelBid = async (req: Request, res: Response): Promise<any> => {
  const { bidId } = req.params;
  const collectorId = (req as any).user.id;

  try {
    const bid = await Bid.findOne({ where: { id: bidId, collectorId } });

    if (!bid) {
      return res.status(404).json({ error: 'Bid not found' });
    }

    if (bid.status === 'canceled') {
      return res.status(400).json({ error: 'Bid has already been canceled' });
    }

    bid.status = 'canceled';
    await bid.save();

    return res.status(200).json({ message: 'Bid canceled successfully' });
  } catch (error) {
    console.error('Error canceling bid:', error);
    return res.status(500).json({ error: 'Failed to cancel bid' });
  }
};
