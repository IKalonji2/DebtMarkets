import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import User from "./user";

class UserDetails extends Model {
  public id!: number;
  public userId!: number;
  public additionalInfo!: object; 
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
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("additionalInfo");
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(value: object) {
        this.setDataValue("additionalInfo", JSON.stringify(value));
      },
    },    
  },
  {
    sequelize,
    modelName: "UserDetails",
    tableName: "user_details",
  }
);

User.hasOne(UserDetails, { foreignKey: "userId", as: "details" });
UserDetails.belongsTo(User, { foreignKey: "userId" });

export default UserDetails;
