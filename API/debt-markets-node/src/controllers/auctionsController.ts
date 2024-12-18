import { Request, Response } from "express";

import Auction from "../models/auction";
import DebtPortfolio from "../models/debt-portfolio.model";
import Bid from "../models/collector/bid";

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


export const placeBid = async (req: Request, res: Response) => {
  const { auctionId, bidAmount } = req.body;
  const collectorId = (req as any).user.id;

  try {
    const auction = await Auction.findOne({ where: { id: auctionId, status: "active" } });

    if (!auction) {
      res.status(400).json({ error: "Auction not found or not active." });
      return;
    }

    // Save the bid
    const bid = await Bid.create({ auctionId, collectorId, bidAmount });

    res.status(201).json({
      message: "Bid placed successfully.",
      bid,
    });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "Failed to place bid." });
  }
};

export const getBidsForAuction = async (req: Request, res: Response) => {
  const { auctionId } = req.params;

  try {
    const bids = await Bid.findAll({
      where: { auctionId },
      order: [["bidAmount", "DESC"]],
    });

    res.status(200).json(bids);
  } catch (error) {
    console.error("Error fetching bids for auction:", error);
    res.status(500).json({ error: "Failed to fetch bids for auction." });
  }
};

export const awardAuction = async (req: Request, res: Response) => {
  const { auctionId, winningBidId } = req.body;

  try {
    const auction = await Auction.findOne({ where: { id: auctionId, status: "active" } });

    if (!auction) {
      res.status(400).json({ error: "Auction not found or not active." });
      return;
    }

    const winningBid = await Bid.findOne({ where: { id: winningBidId, auctionId } });

    if (!winningBid) {
      res.status(400).json({ error: "Winning bid not found for this auction." });
      return;
    }

    // Update auction
    auction.collectorId = winningBid.collectorId;
    auction.winningBidId = winningBidId;
    auction.status = "closed";
    await auction.save();

    res.status(200).json({
      message: "Auction awarded successfully.",
      auction,
    });
  } catch (error) {
    console.error("Error awarding auction:", error);
    res.status(500).json({ error: "Failed to award auction." });
  }
};
