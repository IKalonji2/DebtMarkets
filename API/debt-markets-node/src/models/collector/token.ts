import { DataTypes, Model } from "sequelize";
import sequelize from "../../database";

class Token extends Model {
  public id!: number;
  public collectorId!: number;
  public portfolioId!: number;
  public numTokens!: number;
  public tokenValue!: number;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    collectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numTokens: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tokenValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Token",
    tableName: "tokens",
  }
);

export default Token;
