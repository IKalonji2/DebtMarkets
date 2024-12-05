import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class LoanBundle extends Model {
  public id!: number;
  public collectionAgent!: string;
  public totalValue!: number;
  public currentValue!: number;
  public riskLevel!: "high" | "medium" | "low";
  public performanceStatus!: "good" | "bad" | "neutral";
  public loansCount!: number;
}

LoanBundle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    collectionAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currentValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    riskLevel: {
      type: DataTypes.ENUM("high", "medium", "low"),
      allowNull: false,
    },
    performanceStatus: {
      type: DataTypes.ENUM("good", "bad", "neutral"),
      allowNull: false,
      defaultValue: "neutral",
    },
    loansCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "LoanBundle",
    tableName: "loan_bundles",
  }
);

export default LoanBundle;
