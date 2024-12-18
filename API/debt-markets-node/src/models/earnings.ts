import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import DebtPortfolio from "./debt-portfolio.model";

class Earnings extends Model {
  public id!: number;
  public portfolioId!: number;
  public amount!: number;
  public date!: Date;
}

Earnings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DebtPortfolio,
        key: "id",
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Earnings",
    tableName: "earnings",
  }
);

DebtPortfolio.hasMany(Earnings, { foreignKey: "portfolioId" });
Earnings.belongsTo(DebtPortfolio, { foreignKey: "portfolioId" });

export default Earnings;
