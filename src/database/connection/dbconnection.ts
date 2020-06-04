import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('modyuhno_data', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});
