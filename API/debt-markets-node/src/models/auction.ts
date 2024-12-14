import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import DebtPortfolio from './debtPortfolio';

class Auction extends Model {
  public id!: number;
  public portfolioId!: number;
  public startDate!: Date;
  public endDate!: Date;
  public winningBid!: number;
  public status!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Auction.init(
  {
    portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DebtPortfolio,
        key: 'id',
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    winningBid: {
      type: DataTypes.FLOAT,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    modelName: 'Auction',
  }
);

export default Auction;
