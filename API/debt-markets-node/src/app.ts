import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./database";
// import dotenv from "dotenv";
import lenderRoutes from "./routes/lenderRoutes";
import auctionRoutes from "./routes/auctionRoutes";

// dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/lender", lenderRoutes);
app.use("/auctions", auctionRoutes);

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

startServer();
