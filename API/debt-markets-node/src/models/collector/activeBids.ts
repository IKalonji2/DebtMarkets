import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../database';

interface ActiveBidAttributes {
  id: number;
  auctionName: string;
  amount: number;
  status: "active" | "closed";
  collectorId: number;
}

interface ActiveBidCreationAttributes extends Optional<ActiveBidAttributes, 'id'> {}

export class ActiveBid extends Model<ActiveBidAttributes, ActiveBidCreationAttributes> 
  implements ActiveBidAttributes {
  public id!: number;
  public auctionName!: string;
  public amount!: number;
  public status!: "active" | "closed";
  public collectorId!: number;

  // Timestamps are handled by Sequelize by default (createdAt, updatedAt), but you can add custom options if needed.
}

ActiveBid.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    auctionName: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    collectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "closed"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ActiveBid", 
    tableName: "active_bids", 
    timestamps: true, 
  }
);

export default ActiveBid;
