import fs from 'fs';
import csvParser from 'csv-parser';
import { evaluatePortfolioValue, getClientRating } from './aiModel';

export const evaluateLoanBook = (filePath: string) => {
  return new Promise<any>((resolve, reject) => {
    const results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        const portfolioValue = evaluatePortfolioValue(results);
        const clientRating = getClientRating(results);

        const evaluationResults = {
          portfolioValue,
          clientRating,
          status: 'Evaluated',
        };

        resolve(evaluationResults);
      })
      .on('error', (error) => reject(error));
  });
};
