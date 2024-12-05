import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./database";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;
dotenv.config();


//CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
