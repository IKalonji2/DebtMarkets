import { Request, Response } from "express";
import LoanBundle from "../models/loanBundles";

class LoanBundleController {
  async getOpenLoanBundles(req: Request, res: Response) {
    try {
      const bundles = await LoanBundle.findAll({
        where: { currentValue: { gt: 0 } },
      });
      res.json(bundles);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getLoanBundleDetails(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const bundle = await LoanBundle.findByPk(id);

      if (!bundle) {
        return res.status(404).json({ error: "Loan bundle not found" });
      }

      res.json(bundle);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async updatePerformance(req: Request, res: Response):Promise<any> {
    try {
      const { id } = req.params;
      const { performanceStatus } = req.body;

      const bundle = await LoanBundle.findByPk(id);
      if (!bundle) {
        return res.status(404).json({ error: "Loan bundle not found" });
      }

      bundle.performanceStatus = performanceStatus;
      await bundle.save();

      res.json({ message: "Performance updated successfully", bundle });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new LoanBundleController();
