import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import User from "./user";

class UserDetails extends Model {
  public id!: number;
  public userId!: number;
  public additionalInfo!: string; // Replace with specific fields as needed
}

UserDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    additionalInfo: {
      type: DataTypes.TEXT, // Adjust based on your additional data needs
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserDetails",
    tableName: "user_details",
  }
);

// Define association
User.hasOne(UserDetails, { foreignKey: "userId", as: "details" });
UserDetails.belongsTo(User, { foreignKey: "userId" });

export default UserDetails;
