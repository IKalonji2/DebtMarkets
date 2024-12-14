import { Request, Response } from "express";
import multer from "multer";
import { createDebtPortfolio } from "../services/loanServices";

const upload = multer({ dest: "uploads/" });
export const evaluateLoanBookRoute = upload.single("file");

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

        const newPortfolio = await createDebtPortfolio(
            file.path,
            bookName,
            totalAmount,
            lenderId 
        );

        res.status(200).json({
            message: "Loan book evaluated and saved successfully",
            portfolio: newPortfolio,
        });
    } catch (error) {
        console.error("Error evaluating loan book:", error);
        res.status(500).json({ error: "Failed to evaluate loan book." });
    }
};
