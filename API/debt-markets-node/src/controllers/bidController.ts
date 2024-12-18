import { Request, Response } from 'express';
import Bid from '../models/collector/bid'; 

export const getAllBids = async (req: Request, res: Response) => {
  try {
    const bids = await Bid.findAll();
    res.json(bids);
  } catch (error) {
    console.error('Error fetching bids:', error);
    res.status(500).json({ message: 'Failed to fetch bids' });
  }
};

export const getBidsForCollector = async (req:Request, res:Response): Promise<any> => {
  const collectorId = (req as any).user?.id;
  if (!collectorId) {
    return res.status(400).json({ message: 'Collector ID is required' });
  }

  try {
    const bids = await Bid.findAll({ where: { collectorId }, order: [['createdAt', 'DESC']] });
    res.json(bids);
  } catch (error) {
    console.error('Error fetching bids for collector:', error);
    res.status(500).json({ message: 'Failed to fetch bids' });
  }
};

