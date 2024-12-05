import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Investment extends Model {
  public id!: number;
  public userId!: number;
  public loanBundleId!: number;
  public amount!: number;
}

Investment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loanBundleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Investment",
    tableName: "investments",
  }
);

export default Investment;
