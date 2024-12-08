import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class DebtPortfolio extends Model {
  public id!: number;
  public lenderId!: number;
  public name!: string;
  public description!: string;
  public value!: number;
  public status!: "pending" | "onAuction" | "closed";
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "onAuction", "closed"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "DebtPortfolio",
    tableName: "debt_portfolios",
  }
);

export default DebtPortfolio;
