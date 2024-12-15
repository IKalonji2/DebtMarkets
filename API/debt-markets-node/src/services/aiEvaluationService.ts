import path from "path";
import { exec, spawn } from "child_process";

import csvParser from "csv-parser";
import fs from "fs";
import { Loan } from "../models/loanObject";

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
 * Evaluates a loan portfolio using an AI Python script.
 * @param filePath - The path to the uploaded file containing portfolio data.
 * @returns A promise resolving with the evaluation results (portfolio value, risk distribution, etc.).
 */
export const evaluatePortfolioWithAI = async (filePath: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const pythonScript = path.resolve(__dirname, "../ai_engine/ai_engine.py");
      const command = `python3 ${pythonScript} ${filePath}`;
  
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
  
// export const evaluatePortfolioWithAI = async (filePath: string): Promise<any> => {
//   const pythonProcess = spawn("python3", ["path/to/ai_engine.py", filePath]);
// const aiEnginePath = path.resolve(__dirname, '../ai/ai_engine.py'); // Ensure this points to the correct location.


//   return new Promise((resolve, reject) => {
//       let result = "";
//       pythonProcess.stdout.on("data", (data) => {
//           result += data.toString();
//       });

//       pythonProcess.stderr.on("data", (data) => {
//           console.error(`AI Engine Error: ${data}`);
//       });

//       pythonProcess.on("close", (code) => {
//           try {
//               if (code === 0) {
//                   const parsedResult = JSON.parse(result);
//                   if (parsedResult.error) {
//                       reject(new Error(parsedResult.error));
//                   } else {
//                       resolve(parsedResult);
//                   }
//               } else {
//                   reject(new Error("AI Engine process failed."));
//               }
//           } catch (error) {
//               reject(new Error(`Failed to parse AI response: ${(error as Error).message}`));
//           }
//       });
//   });
// };
