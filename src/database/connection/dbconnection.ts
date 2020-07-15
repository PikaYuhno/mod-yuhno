import { Sequelize } from "sequelize";

export const createConnection = () => {
    let conn = new Sequelize("postgres", "postgres", "postgres", {
        host: "0.0.0.0",
        dialect: "postgres",
        logging: false,
    });
    return conn;
};
export const sequelize = createConnection();

