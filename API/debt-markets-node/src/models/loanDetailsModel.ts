import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class LoanDetails extends Model {
  public id!: number;
  public portfolioId!: number; // Foreign key to DebtPortfolio
  public loanAmount!: number;
  public repaymentRate!: number;
  public defaultHistory!: number;
  public incomeLevel!: number;
  public creditScore!: number;
  public repaymentProbability!: number;
}

LoanDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loanAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    repaymentRate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    defaultHistory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    incomeLevel: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    creditScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    repaymentProbability: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "LoanDetails",
    tableName: "loan_details",
  }
);

export default LoanDetails;
