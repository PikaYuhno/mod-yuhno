import { Sequelize } from "sequelize";

export const createConnection = () => {
    let conn = new Sequelize("postgres", "postgres", "postgres", {
        host: "db",
        dialect: "postgres",
        logging: false,
    });
    return conn;
};
export const sequelize = createConnection();

