import { DataTypes, Model } from "sequelize";
import sequelize from "../../database";

class Bid extends Model {
  public id!: number;
  public auctionId!: number;
  public collectorId!: number;
  public portfolioId!:number;
  public bidAmount!: number;
  public createdAt!: Date;
  public bidDate!: Date;
  public status!: string;
}

Bid.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    auctionId: { type: DataTypes.INTEGER, allowNull: false },
    collectorId: { type: DataTypes.INTEGER, allowNull: false },
    portfolioId: { type:DataTypes.INTEGER, allowNull:true},
    bidAmount: { type: DataTypes.FLOAT, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    bidDate: {type: DataTypes.DATE, allowNull: true},
    status: { type: DataTypes.STRING, allowNull: false}
  },
  {
    sequelize,
    modelName: "Bid",
    tableName: "Bids",
  }
);

export default Bid;
