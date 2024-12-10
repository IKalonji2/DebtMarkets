import { Request, Response, NextFunction } from 'express';

export const validateCSVFile = (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;
  if (file && file.mimetype !== 'text/csv') {
    return res.status(400).json({ error: 'Invalid file type. Please upload a CSV file.' });
  }
  next();
};
