import { Sequelize } from "sequelize";
import { config } from "../config";

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: "postgres",
    logging: true,
  }
);

export default sequelize;
