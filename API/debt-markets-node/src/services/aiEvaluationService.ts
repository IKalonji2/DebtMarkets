import path from "path";
import { exec } from "child_process";
import csvParser from "csv-parser";
import fs from "fs";
import { Loan } from "../models/loanObject";
import pdf2json from 'pdf2json';

/**
 * Parses CSV data for loan portfolio.
 * @param filePath - The path to the CSV file.
 * @returns A promise resolving with an array of Loan objects.
 */
export const parseCsvToLoans = async (filePath: string): Promise<Loan[]> => {
  const loans: Loan[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        loans.push(row);
      })
      .on("end", () => resolve(loans))
      .on("error", (error) => reject(error));
  });
};

/**
 * Evaluates a loan portfolio using the AI Python script.
 * @param filePath - The path to the uploaded CSV file containing portfolio data.
 * @returns A promise resolving with the evaluation results (portfolio value, risk distribution, etc.).
 */
export const evaluatePortfolioWithAI = async (filePath: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const pythonScript = path.resolve(__dirname, "../ai_engine/ai_engine.py");
    
    // Build the command with proper parameters for the Python script
    const command = `python3 ${pythonScript} ${filePath} csv portfolio`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing Python script:", stderr);
        return reject(new Error("Failed to evaluate loan book."));
      }

      try {
        const evaluationResults = JSON.parse(stdout);
        resolve(evaluationResults);
      } catch (parseError) {
        reject(new Error("Failed to parse AI evaluation results."));
      }
    });
  });
};

/**
 * Extracts and evaluates a recovery report PDF using AI.
 * @param filePath - The path to the uploaded PDF recovery report.
 * @returns A promise resolving with the extracted data.
 */
export const evaluateRecoveryReportWithAI = async (filePath: string): Promise<any> => {
  try {
    const data = await fs.promises.readFile(filePath);

    return new Promise((resolve, reject) => {
      const pdfParser = new pdf2json();

      // Handle PDF parsing errors
      pdfParser.on("pdfParser_dataError", err => {
        console.error("PDF Parsing Error:", err);
        reject(new Error("PDF parsing failed"));
      });

      // Handle PDF data extraction success
      pdfParser.on("pdfParser_dataReady", pdfData => {
        console.log('Extracted PDF content:', pdfData);
        
        // Extract data from the parsed PDF content
        const extractedData = extractDataFromPdf(pdfData);

        if (!extractedData) {
          reject(new Error('No valid data extracted from the PDF report.'));
        } else {
          resolve(extractedData);
        }
      });

      // Parse the PDF file
      pdfParser.parseBuffer(data);
    });
  } catch (error) {
    console.error('Error evaluating recovery report:', error);
    throw error;
  }
};

/**
 * Helper function to extract relevant data from the parsed PDF content.
 * @param pdfData - Parsed PDF data.
 * @returns An object with the extracted recovery data or null.
 */
const extractDataFromPdf = (pdfData: any) => {
  // Extract the text from the PDF content
  const text = pdfData.formImage?.Pages?.map((page: any) => 
    page.Texts?.map((text: any) => text.R[0].T).join(' ')
  ).join('\n');
  
  // Log the extracted text to check its format
  console.log("Extracted Text:", text);

  // Ensure text is valid before proceeding with regex matching
  if (!text) {
    console.error("No text found in PDF");
    return null;
  }

  // Regular expression for matching the data table in the PDF
  const regex = /Portfolio\s+(\d+)\s+(\d+(\.\d+)?)\s+(\d+(\.\d+)?)\s+(\d+\s+days)\s+(\d+(\.\d+)?\s+%)/;
  const match = text.match(regex);

  if (match) {
    const portfolioId = match[1];
    const recoveredAmount = parseFloat(match[2]);
    const targetAmount = parseFloat(match[3]);
    const collectionTime = match[5]; // e.g., "30 days"
    const effortStatus = match[7]; // e.g., "85%"

    return {
      portfolioId,
      recoveredAmount,
      targetAmount,
      collectionTime,
      effortStatus
    };
  }

  return null;
};
