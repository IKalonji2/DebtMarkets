import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./database";
import authRoutes from "./routes/authRoutes";

const app = express();
const PORT = 3000;

//CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);

// Start server and initialize database
const startServer = async () => {
  try {
    await sequelize.sync(); // Sync the database
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
