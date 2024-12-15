import { Transaction } from "sequelize";
import TokenBundle from "../models/tokenizationBundle";
import DebtPortfolio from "../models/debtPortfolio";

export const calculateTokenValue = async (portfolioId: number, numTokens: number): Promise<number> => {
    const portfolio = await DebtPortfolio.findByPk(portfolioId);
    if (!portfolio) {
        throw new Error("Portfolio not found.");
    }

    if (portfolio.portfolioValue === null) {
        throw new Error("Portfolio value is not set for this portfolio.");
    }

    if (numTokens <= 0) {
        throw new Error("Number of tokens must be greater than zero.");
    }

    return portfolio.portfolioValue / numTokens;
};

export const createTokenBundle = async (
    lenderId: number,
    portfolioId: number,
    numTokens: number,
    transaction?: Transaction
  ) => {
    
    const tokenValue = await calculateTokenValue(portfolioId, numTokens);

    return await TokenBundle.create(
        {
            lenderId,
            portfolioId,
            numTokens,
            tokenValue,
        },
        { transaction }
    );
  };