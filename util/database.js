import Sequelize from "sequelize";

//This sets up connection pool
export const sequelize = new Sequelize("node-tech-store", "root", "loczko420", {
  dialect: "mysql",
  host: "localhost",
});
