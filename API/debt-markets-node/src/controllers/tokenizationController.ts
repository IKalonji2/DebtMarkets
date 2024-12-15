import sequelize from "../database";
import { Request, Response } from "express";


import DebtPortfolio from "../models/debtPortfolio";
import { evaluatePortfolioWithAI } from "../services/aiEvaluationService";
import { createTokenBundle } from "../services/tokenizationService";

/**
 * Create Tokens Controller
 * Handles the tokenization of an evaluated debt portfolio
 */
export const createTokens = async (req: Request, res: Response): Promise<any> => {
    const transaction = await sequelize.transaction();
    try {
        const file = req.file;
        const { portfolioId } = req.body;
        const lenderId = (req as any).user.id;

        const portfolio = await DebtPortfolio.findOne({
            where: { id: portfolioId, lenderId, status: "evaluated" },
        });

        if (!portfolio) {
            return res.status(400).json({ error: "Portfolio not eligible for tokenization." });
        }

        const evaluationResults = await evaluatePortfolioWithAI(file!.path);
        const { tokenValue, numTokens } = evaluationResults;

        const tokenBundle = await createTokenBundle(lenderId, portfolioId, numTokens, transaction);

        portfolio.status = "tokenized";
        portfolio.tokenValue = tokenValue;
        portfolio.numTokens = numTokens;
        await portfolio.save({ transaction });

        await transaction.commit();

        res.status(201).json({
            message: "Tokens created successfully.",
            tokenBundle,
        });
    } catch (error) {
        console.error("Error creating tokens:", error);

        await transaction.rollback();
        res.status(500).json({ error: "Failed to create tokens." });
    }
};
