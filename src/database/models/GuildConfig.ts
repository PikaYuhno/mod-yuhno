import { sequelize } from "../connection/";
import { Model, DataTypes } from "sequelize";
export default class Configuration extends Model {
    public id: number;
    public guildId: string;
    //Config
    public prefix: string;
    public muted_role: string;
    public message_log: string;

    public createdAt: Date;
    public updatedAt: Date;
}
/**let defaultConfig = JSON.stringify({
    prefix: "$",
    muted_role: "",
    message_log: "",
    default_role: "",
});*/

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
        prefix: {
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        muted_role: {
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
        message_log: {
            type: DataTypes.STRING(255),
            defaultValue: "",
        },
    },
    {
        sequelize,
        tableName: "guild_config",
    }
);

Configuration.sync();
