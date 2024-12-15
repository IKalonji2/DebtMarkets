import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Auction from "./auction";
import TokenBundle from "./tokenizationBundle";

class DebtPortfolio extends Model {
  public id!: number;
  public lenderId!: number;
  public portfolioName!: string;
  // public loanType!: string;
  public description!: string;
  public bookValue!: number;
  public portfolioValue!: number | null;
  public riskDistribution!: { [key: string]: number } | null;
  public predictions!: number[] | null;
  public probabilities!: number[][] | null;
  public rating!: string | null;
  public status!: "pending" | "onAuction" | "closed" | "tokenized" | "evaluated";
  public tokenValue?: number;
  public numTokens?: number;
  public evaluatedAt!: Date;
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
      allowNull: false,
      defaultValue: 0,
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
      type: DataTypes.ENUM("pending", "evaluated", "active", "onAuction", "closed", "tokenized"),
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

DebtPortfolio.hasMany(TokenBundle, { foreignKey: 'portfolioId' });
TokenBundle.belongsTo(DebtPortfolio, { foreignKey: 'portfolioId' });
export default DebtPortfolio;
