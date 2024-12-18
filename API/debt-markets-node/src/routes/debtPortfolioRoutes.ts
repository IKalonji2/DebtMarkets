import express, { Request, Response } from "express";
// import { createDebtPortfolio } from "../controllers/debtPortfolioController";
import { evaluateLoanBookRoute } from "../controllers/loanBookController"; // File upload middleware
import DebtPortfolio from "../models/debt-portfolio.model";
import { validateToken } from "../middlewares/authenticate";

const router = express.Router();

// Route to fetch portfolios for a specific lender
router.get(
  "/portfolios",
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;
      const portfolios = await DebtPortfolio.findAll({ where: { lenderId: user?.id } });
      res.json(portfolios);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      res.status(500).json({ error: "Error fetching portfolios" });
    }
  }
);

// router.post(
//   "/portfolios",
//   validateToken,
//   evaluateLoanBookRoute, 
//   createDebtPortfolio 
// );

export default router;
