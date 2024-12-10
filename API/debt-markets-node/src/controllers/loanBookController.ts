import { Request, Response } from 'express';
import { evaluateLoanBook } from '../services/loanServices';

export const evaluateLoanBookController = async (req: Request, res: Response): Promise<any> => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const evaluationResults = await evaluateLoanBook(file.path);

    return res.status(200).json({
      message: 'Loan book evaluated successfully',
      evaluationResults,
    });
  } catch (error) {
    console.error('Error evaluating loan book:', error);
    return res.status(500).json({ error: 'Failed to evaluate loan book' });
  }
};
