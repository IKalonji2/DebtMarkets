import { Request, Response } from 'express';
import OpenLoanBundlesService from '../services/open-trades.service';

class OpenLoanBundlesController {
  // Get all open trades
  async getAllOpenLoanBundles(req: Request, res: Response): Promise<any> {
    try {
      const bundles = await OpenLoanBundlesService.getAllOpenTrades();
      return res.status(200).json(bundles);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get all trades open for a specific trader
  async getOpenLoanBundlesForTrader(req: Request, res: Response): Promise<any> {
    try {
      const traderId = req.params.traderId;
      const bundles = await OpenLoanBundlesService.getOpenTradesForTrader(traderId);
      return res.status(200).json(bundles);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get a single trade by ID
  async getLoanBundleById(req: Request, res: Response): Promise<any> {
    try {
      const bundleId = req.params.id;
      const bundle = await OpenLoanBundlesService.getOpenTradeById(bundleId);
      return res.status(200).json(bundle);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export default new OpenLoanBundlesController();
