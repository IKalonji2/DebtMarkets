import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import Auction from "./auction";
import TokenBundle from "./tokenizationBundle";

class DebtPortfolio extends Model {
  public id!: number;
  public lenderId!: number;
  public collectorId!: number;
  public portfolioName!: string;
  public description!: string;
  public bookValue!: number;
  public portfolioValue!: number | null;
  public riskDistribution!: { [key: string]: number } | null;
  public predictions!: number[] | null;
  public probabilities!: number[][] | null;
  public rating!: string | null;
  public status!: "pending" | "onAuction" | "closed" | "tokenized" | "evaluated" | "inProgress";
  public tokenValue?: number;
  public numTokens?: number;
  public evaluatedAt!: Date;
  public recoveredAmount?: number;
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
    collectorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    portfolioName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "evaluated", "active", "onAuction", "closed", "tokenized", "inProgress"),
      defaultValue: "pending",
    },
    evaluatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    recoveredAmount: {  
      type: DataTypes.FLOAT,
      allowNull: false, 
      defaultValue: 0
    }
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
