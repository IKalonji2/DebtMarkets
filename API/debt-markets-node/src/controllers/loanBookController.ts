import { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import DebtPortfolio from "../models/debt-portfolio.model"; // Assuming this is the model for portfolios
import LoanDetails from "../models/loanDetailsModel"; // Assuming this is the model for individual loan details
import { createDebtPortfolio } from "../services/loanServices"; // Assuming these are the services
import { evaluatePortfolioWithAI } from "../services/aiEvaluationService"; // AI evaluation service

// File upload setup
const upload = multer({ dest: "uploads/" });
export const evaluateLoanBookRoute = upload.single("file");

/**
 * Evaluate Loan Book Controller
 * Handles the evaluation of loan books uploaded by lenders
 */
export const evaluateLoanBookController = async (req: Request, res: Response): Promise<any> => {
    try {
        const file = req.file;
        const { bookName, totalAmount } = req.body;
        const lenderId = (req as any).user?.id;

        if (!lenderId) {
            return res.status(401).json({ error: "User not authenticated." });
        }

        if (!file || !bookName || !totalAmount) {
            return res.status(400).json({ error: "Missing required form data or file." });
        }

        if (file.mimetype !== "text/csv") {
            return res.status(400).json({ error: "Invalid file type. Only CSV files are allowed." });
        }

        if (isNaN(totalAmount) || totalAmount <= 0) {
            return res.status(400).json({ error: "Invalid totalAmount. Must be a positive number." });
        }

        const newPortfolio = await createDebtPortfolio(file.path, bookName, parseFloat(totalAmount), lenderId);

        const evaluationResults = await evaluatePortfolioWithAI(file.path);
        const { portfolioValue, tokenValue, numTokens } = evaluationResults;

        if (!portfolioValue || portfolioValue <= 0) {
            throw new Error("Invalid portfolio value returned from AI evaluation.");
        }

        // Step 3: Update portfolio with evaluation results
        newPortfolio.status = "evaluated";
        newPortfolio.portfolioValue = portfolioValue;
        newPortfolio.tokenValue = tokenValue;
        newPortfolio.numTokens = numTokens;
        await newPortfolio.save();

        // Cleanup the uploaded file
        fs.unlink(file.path, (err) => {
            if (err) console.error("Error deleting uploaded file:", err);
        });

        // Respond with success
        return res.status(200).json({
            message: "Loan book evaluated and saved successfully",
            portfolio: newPortfolio,
        });
    } catch (error) {
        console.error("Error evaluating loan book:", (error as Error).message, (error as Error).stack);
        return res.status(500).json({ error: "Failed to evaluate loan book." });
    }
};
