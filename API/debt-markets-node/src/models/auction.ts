import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Auction extends Model {
  public id!: number;
  public portfolioId!: number;
  public collectorId!: number;
  public winningBidId!: number;
  public bidAmount!: number;
  public status!: "active" | "closed" | "pending";
  public createdAt!: Date;
}

Auction.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    portfolioId: { type: DataTypes.INTEGER, allowNull: false },
    collectorId: { type: DataTypes.INTEGER, allowNull: true }, 
    winningBidId: { type: DataTypes.INTEGER, allowNull: true }, 
    bidAmount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.ENUM("active", "closed", "pending"), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    modelName: "Auction",
    tableName: "Auctions",
  }
);


export default Auction;
