"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnection_1 = require("../connection/dbconnection");
const sequelize_1 = require("sequelize");
class Configuration extends sequelize_1.Model {
}
exports.default = Configuration;
let defaultConfig = JSON.stringify({
    prefix: "$",
    muted_role: "",
    message_log: "",
    default_role: "",
});
Configuration.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    guildId: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    config: {
        type: sequelize_1.DataTypes.STRING(255),
        defaultValue: defaultConfig,
    },
}, {
    sequelize: dbconnection_1.sequelize,
    tableName: "configurations",
});
Configuration.sync();
