import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize("notes_db", "root", "", {
  host: "34.170.151.206",
  dialect: "mysql"
});

export default db;
