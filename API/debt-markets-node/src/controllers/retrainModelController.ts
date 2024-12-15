// import { exec } from "child_process";

// export const retrainModel = async (req: Request, res: Response) => {
//     const { trainingDataPath } = req.body;

//     if (!trainingDataPath) {
//         return res.status(400).json({ error: "Training data path is required." });
//     }

//     exec(`python3 ai_engine.py train ${trainingDataPath}`, (error, stdout, stderr) => {
//         if (error) {
//             console.error("Retraining failed:", stderr);
//             return res.status(500).json({ error: "Failed to retrain the model." });
//         }

//         res.status(200).json({ message: "Model retrained successfully.", logs: stdout });
//     });
// };
