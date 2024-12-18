import Auction from "../models/auction";
import DebtPortfolio from "../models/debt-portfolio.model";
import LoanDetails from "../models/loanDetailsModel";
import { evaluatePortfolioWithAI, parseCsvToLoans } from "../services/aiEvaluationService";

export const createDebtPortfolio = async (
  filePath: string,
  bookName: string,
  totalAmount: number,
  lenderId: number
) => {
  let evaluationResults;
  let status = "pending"; 
  try {
    evaluationResults = await evaluatePortfolioWithAI(filePath);
    console.log("Evaluation Results:", evaluationResults);

    if (evaluationResults.loans && Array.isArray(evaluationResults.loans)) {
      status = "active";
    } else {
      evaluationResults.loans = await parseCsvToLoans(filePath);

      if (evaluationResults.loans.length > 0) {
        status = "active";
      }
    }
  } catch (error) {
    console.error("AI Evaluation Failed:", error);
    evaluationResults = { loans: [] };
  }

  const newPortfolio = await DebtPortfolio.create({
    portfolioName: bookName,
    bookValue: totalAmount,
    portfolioValue: evaluationResults.portfolioValue || null,
    riskDistribution: evaluationResults.riskDistribution || null,
    rating: evaluationResults.rating || null,
    lenderId,
    status,
  });

  if (evaluationResults.loans.length > 0) {
    for (const loan of evaluationResults.loans) {
      await LoanDetails.create({
        portfolioId: newPortfolio.id,
        loanAmount: loan.loan_amount,
        repaymentRate: loan.repayment_rate,
        defaultHistory: loan.default_history,
        incomeLevel: loan.income_level,
        creditScore: loan.credit_score,
        repaymentProbability: loan.repayment_probability,
      });
    }
  }

  if (status === "active") {
    const auctionDurationDays = 7;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + auctionDurationDays);

    await Auction.create({
      portfolioId: newPortfolio.id,
      startDate,
      endDate,
      winningBid: null,
      status: "active",
    });
  }

  return newPortfolio;
};

