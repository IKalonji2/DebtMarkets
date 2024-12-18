import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { evaluateRecoveryReportWithAI } from '../services/aiEvaluationService';
import multer from 'multer';
import DebtPortfolio from '../models/debt-portfolio.model';
import fs from 'fs';
import { RecoveryReport } from '../models/collector/recovery';
import { OpenTrade } from '../models/open-trade.model';
import TokenBundle from '../models/tokenizationBundle';


export const getRecoveriesData = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log("Request received for progress data");
    const collectorId = (req as any).user?.id;
    console.log("Collector ID:", collectorId);

    const progressData = await DebtPortfolio.findAll({
      where: { collectorId },
      attributes: ["id", "portfolioName", "portfolioValue", "recoveredAmount", "status"],
    });

    console.log("Progress data:", progressData);

    return progressData.map((portfolio) => ({
      id: portfolio.id,
      portfolioName: portfolio.portfolioName,
      bookValue: portfolio.bookValue,
      recoveredAmount: portfolio.recoveredAmount,
      recoveryProgress: 
        (portfolio.recoveredAmount && portfolio.bookValue) 
          ? ((portfolio.recoveredAmount / portfolio.bookValue) * 100).toFixed(2) + "%" 
          : "0%",
      status: portfolio.status,
    }));
  } catch (error) {
    console.error("Error fetching recoveries data:", error);
    throw new Error("Database query failed");
  }
};


export const uploadRecoveryReport = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { portfolioId, recoveredValue , amountRecovered} = req.body;
    const recoveryReportPath = req.file?.path;

    if (!portfolioId || !recoveredValue || !recoveryReportPath) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const portfolio = await DebtPortfolio.findByPk(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found." });
    }

    const evaluationResult = await evaluateRecoveryReportWithAI(recoveryReportPath);

    if (!evaluationResult || evaluationResult.portfolioId !== portfolioId.toString()) {
      return res.status(400).json({ error: "Invalid recovery report." });
    }

    portfolio.recoveredAmount = portfolio.recoveredAmount? portfolio.recoveredAmount += parseFloat(recoveredValue) : 0;
    portfolio.status = "inProgress"; 
    await portfolio.save();

    const newReport = await RecoveryReport.create({
      collectorId: (req as any).user.id,
      amountRecovered: parseFloat(amountRecovered),
      uploadedAt: new Date(),
    });
    return res.status(200).json({ message: "Recovery updated successfully.", portfolio });
  } catch (error) {
    console.error("Error updating recovery:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};


export const tokenizeReport = async (req:Request, res:Response): Promise<any> => {
  try {
    const { portfolioId, sharePrice } = req.body;

    if (!portfolioId || !sharePrice) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const portfolio = await DebtPortfolio.findByPk(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found." });
    }

    const recoveredAmount = portfolio.recoveredAmount ?? 0;
    if (portfolio.portfolioValue === null) {
      return res.status(400).json({ error: "Portfolio value is not set." });
    }
    const portfolioValue = portfolio.portfolioValue;

    const remainingValue = portfolioValue - recoveredAmount;
    if (remainingValue <= 0) {
      return res.status(400).json({ error: "No remaining value to tokenize." });
    }

    const totalShares = Math.floor(remainingValue / parseFloat(sharePrice));

    const tokenBundle = await TokenBundle.create({
      portfolioId,
      tokenValue: remainingValue,
      numTokens: totalShares,
    });

    portfolio.status = "tokenized";
    portfolio.tokenValue = remainingValue;
    portfolio.numTokens = totalShares;
    await portfolio.save();

    return res.status(201).json({ message: "Tokenization successful.", tokenBundle });
  } catch (error) {
    console.error("Error tokenizing portfolio:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const createTrade =  async (req:Request, res:Response): Promise<any> => {
  try {
    const { portfolioId, sharePrice } = req.body;

    if (!portfolioId || !sharePrice) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const portfolio = await DebtPortfolio.findByPk(portfolioId);
    if (!portfolio || portfolio.status !== "tokenized") {
      return res.status(400).json({ error: "Portfolio not ready for trading." });
    }

    const openTrade = await OpenTrade.create({
      bundleId: portfolioId,
      remainingValue: portfolio.tokenValue,
      sharePrice: parseFloat(sharePrice),
      totalShares: portfolio.numTokens,
      status: "open",
    });

    return res.status(201).json({ message: "Trade created successfully.", openTrade });
  } catch (error) {
    console.error("Error creating trade:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
