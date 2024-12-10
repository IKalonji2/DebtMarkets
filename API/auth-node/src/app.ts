import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./database";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import { authenticate } from "./middlewares/authenticate";

const app = express();
const PORT = 3000;
dotenv.config();


app.use(cors());

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use("/protected-route", authenticate, (req, res) => {
  console.log("User in Protected Route:", (req as any).user);
  res.json({ message: "Access granted", user: (req as any).user });
});

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
