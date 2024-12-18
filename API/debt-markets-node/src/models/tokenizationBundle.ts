import { Model, DataTypes } from "sequelize";
import sequelize  from "../database";
import DebtPortfolio from "./debt-portfolio.model";

class TokenBundle extends Model {}

TokenBundle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        lenderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        portfolioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        numTokens: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tokenValue: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "TokenBundle",
    }
);

export default TokenBundle;
