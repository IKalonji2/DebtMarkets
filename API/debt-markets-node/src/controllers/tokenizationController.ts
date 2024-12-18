import { Request, Response } from "express";
import LoanBook from "../models/loanBook.model";
import RecoveryReport from "../models/collector/recovery";
import Token from "../models/collector/token";

function isLoanBook(model: any): model is LoanBook {
  return model && model.tokenized !== undefined && model.token_count !== undefined && model.token_value !== undefined;
}

export const tokenizeDocument = async (req: Request, res: Response): Promise<any> => {
  try {
    const { documentId, documentType, totalValue, numTokens } = req.body;

    if (!documentId || !documentType || !totalValue || !numTokens) {
      return res.status(400).json({ error: "All input fields are required." });
    }

    const tokenValue = (totalValue / numTokens).toFixed(2);

    if (documentType === "loanbook") {
      const document = await LoanBook.findByPk(documentId);
      if (!document) {
        return res.status(404).json({ error: "LoanBook not found." });
      }

      document.tokenized = true;
      document.token_count = numTokens;
      document.token_value = parseInt(tokenValue); 

      await document.save();

      await Token.create({
        portfolioId: documentId,
        numTokens,
        tokenValue,
        documentType,
      });

      return res.status(200).json({
        message: "LoanBook tokenized successfully.",
        data: {
          documentId,
          numTokens,
          tokenValue,
        },
      });
    }

    if (documentType === "recovery") {
      const document = await RecoveryReport.findByPk(documentId);
      if (!document) {
        return res.status(404).json({ error: "RecoveryReport not found." });
      }

      // Custom logic for RecoveryReport (if needed)
      // You can add tokenization logic for RecoveryReport here if necessary
      // If RecoveryReport has tokenization fields, apply them similarly to LoanBook

      await document.save();

      await Token.create({
        portfolioId: documentId,
        numTokens,
        tokenValue,
        documentType,
      });

      return res.status(200).json({
        message: "RecoveryReport tokenized successfully.",
        data: {
          documentId,
          numTokens,
          tokenValue,
        },
      });
    }

    return res.status(400).json({ error: "Invalid document type specified." });
  } catch (error) {
    console.error("Error during tokenization:", error);
    return res.status(500).json({ error: "An internal error occurred during tokenization." });
  }
};
