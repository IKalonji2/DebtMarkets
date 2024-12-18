import { DataTypes, Model } from "sequelize";
import sequelize from "../../database";

class Update extends Model {
  public id!: number;
  public collectorId!: number;
  public title!: string;
  public message!: string;
  public createdAt!: Date;
}

Update.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Update",
    tableName: "updates",
    timestamps: false,
  }
);

export default Update;
