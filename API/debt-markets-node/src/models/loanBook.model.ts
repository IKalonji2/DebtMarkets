import { Model, DataTypes } from "sequelize";
import sequelize  from "../database"; 

class LoanBook extends Model {
  public id!: number;
  public tokenized!: boolean;
  public token_count!: number;
  public token_value!: number;
}

LoanBook.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tokenized: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    token_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    token_value: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "loanbooks",
    timestamps: false,
  }
);

export default LoanBook;
