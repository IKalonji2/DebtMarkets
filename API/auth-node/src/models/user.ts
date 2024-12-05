import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public hashedPassword!: string;
  public role!: "lender" | "collector" | "trader";
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("lender", "collector", "trader"),
      allowNull: false,
            defaultValue: "trader",
          },
      },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
