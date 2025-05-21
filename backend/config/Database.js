import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const api_host = process.env.API_HOST
const api_password = process.env.API_PASSWORD
const api_username = process.env.API_USERNAME
const api_database = process.env.API_DATABASE

const db = new Sequelize(api_database, api_username, api_password, {
  host: api_host,
  dialect: "mysql"
});


export default db;
