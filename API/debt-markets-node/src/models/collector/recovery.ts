import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../database";

// Make 'id' optional for creation
interface RecoveryReportAttributes {
  id: number;
  collectorId: number;
  amountRecovered: number;
  uploadedAt: Date;
}

interface RecoveryReportCreationAttributes extends Optional<RecoveryReportAttributes, "id"> {}

export class RecoveryReport extends Model<RecoveryReportAttributes, RecoveryReportCreationAttributes> 
  implements RecoveryReportAttributes {
  public id!: number;
  public collectorId!: number;
  public amountRecovered!: number;
  public uploadedAt!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RecoveryReport.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    collectorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    amountRecovered: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    uploadedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "recoveryReports",
    timestamps: true,
  }
);

export default RecoveryReport;
