import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Auction from "./auction";

class DebtPortfolio extends Model {
  public id!: number;
  public lenderId!: number;
  public portfolioName!: string;
  // public loanType!: string;
  public description!: string;
  public bookValue!: number; // Total value of the loan book
  public portfolioValue!: number | null; // AI-evaluated value
  public riskDistribution!: { [key: string]: number } | null; // Risk levels as a JSON object
  public predictions!: number[] | null; // AI predictions per loan
  public probabilities!: number[][] | null; // Probabilities from the AI model
  public rating!: string | null; // Bank rating, e.g., 'A', 'B', etc.
  public status!: "pending" | "onAuction" | "closed";
  public evaluatedAt!: Date; // Timestamp for evaluation
}

DebtPortfolio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    portfolioName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // loanType: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    description: {
      type: DataTypes.TEXT,
    },
    bookValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    portfolioValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    riskDistribution: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    predictions: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    probabilities: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true, // 'A', 'B', 'C', etc.
    },
    status: {
      type: DataTypes.ENUM("pending", "onAuction", "closed"),
      defaultValue: "pending",
    },
    evaluatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "DebtPortfolio",
    tableName: "debt_portfolios",
  }
);

DebtPortfolio.hasMany(Auction, { foreignKey: 'portfolioId' });
Auction.belongsTo(DebtPortfolio, { foreignKey: 'portfolioId' });


export default DebtPortfolio;
