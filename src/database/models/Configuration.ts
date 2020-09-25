import { sequelize } from "../connection/dbconnection";
import { Model, DataTypes } from "sequelize";
export default class Configuration extends Model {
    public id: number;
    public guildId: string;
    public config: string;
    public default_role: string;
    public createdAt: Date;
    public updatedAt: Date;
}
let defaultConfig = JSON.stringify({
    prefix: "$",
    muted_role: "",
    message_log: "",
    default_role: "",
});

Configuration.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        guildId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        config: {
            type: DataTypes.STRING(255),
            defaultValue: defaultConfig,
        },
    },
    {
        sequelize,
        tableName: "configurations",
    }
);
Configuration.sync();
