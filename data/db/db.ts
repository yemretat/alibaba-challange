import { Dialect, Sequelize } from "sequelize";
import Logger from "../../helpers/logger/Logger";
import { db } from "../../config/config";
const DATABASE_NAME: string = db.name;
const USER_NAME: string = db.user;
const HOST_NAME: string = db.host;
const PASSWORD: string = db.password;
const DIALECT: Dialect = "mysql";

export const sequelize: Sequelize = new Sequelize(
  DATABASE_NAME,
  USER_NAME,
  PASSWORD,
  {
    host: HOST_NAME,
    dialect: DIALECT,
  }
);
sequelize
  .authenticate()
  .then(() => {
    Logger.info("Connection has been established successfully..");
  })
  .catch((err) => {
    Logger.error(JSON.stringify(err));
    console.error("Unable to connect to the database:", err);
  });
