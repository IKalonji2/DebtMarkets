import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import DebtPortfolio from "./debtPortfolio";

class Auction extends Model {
  public id!: number;
  public portfolioId!: number;
  public startTime!: Date;
  public endTime!: Date;
  public highestBid!: number;
}

Auction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    portfolioId: {
      type: DataTypes.INTEGER,
      references: {
        model: DebtPortfolio,
        key: "id",
      },
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    highestBid: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Auction",
    tableName: "auctions",
  }
);

DebtPortfolio.hasOne(Auction, { foreignKey: "portfolioId", as: "auction" });
Auction.belongsTo(DebtPortfolio, { foreignKey: "portfolioId" });

export default Auction;
