import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

export class OpenTrade extends Model {
  public id!: number;
  public bundleId!: number;
  public remainingValue!: number;
  public sharePrice!: number;
  public totalShares!: number;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

OpenTrade.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    bundleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    remainingValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sharePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalShares: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "open",
    },
  },
  {
    sequelize,
    tableName: "opentrades",
    timestamps: true,
  }
);

export default OpenTrade;
