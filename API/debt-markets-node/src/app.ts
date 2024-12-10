/// <reference path="./types/types.d.ts" />
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import dotenv from "dotenv";
import sequelize from "./database";
import lenderRoutes from "./routes/lenderRoutes";
import auctionRoutes from "./routes/auctionRoutes";
import earningRoutes from "./routes/earningRoutes";

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
// app.use(cors({
//   origin: "http://localhost:4200/",
//   allowedHeaders: ["Authorization", "Content-Type"],
// }));
app.use(bodyParser.json());

// Routes
app.use("/lender", lenderRoutes);
app.use("/auctions", auctionRoutes);
app.use("/earnings", earningRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "DebtMarkets service is healthy!" });
});

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`DebtMarkets service running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await sequelize.close();
  process.exit(0);
});

startServer();
