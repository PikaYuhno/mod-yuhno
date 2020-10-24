import { sequelize } from "../connection/";
import { Model, DataTypes } from "sequelize";

export default class CommandConfig extends Model {
    public id: number;
    public random_role: string;
    public random_permitted_roles: Array<string>;

    public createdAt: Date;
    public updatedAt: Date;
}

CommandConfig.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
        },
        random_role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        random_permitted_roles: {
            type: DataTypes.ARRAY,
            allowNull: true,
        },
    },
    {
        tableName: "command_config",
        sequelize,
    }
);
