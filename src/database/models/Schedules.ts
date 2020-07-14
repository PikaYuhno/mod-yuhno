import { sequelize } from '../connection/dbconnection';
import { Model, DataTypes } from 'sequelize'

export default class Schedules extends Model {

    public id: number;
    public guildId: String;
    public userId: String;
    public finish: Date;
    public createdAt: Date;
    public updatedAt: Date;
}

Schedules.init({
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false
    },
    guildId: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    finish: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},  {
    sequelize,
    tableName: 'schedules'
});
