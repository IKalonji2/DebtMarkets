import express from "express";
import LoanRoutes from "./routes/loanRoutes";

const app = express();

app.use(express.json());
app.use("/api", LoanRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
