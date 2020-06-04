"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('modyuhno_data', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});
