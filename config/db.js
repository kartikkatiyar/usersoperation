const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

const dbConfig = {
  host: process.env.SQL_DB_HOST,
  user: process.env.SQL_DB_USERNAME,
  password: process.env.SQL_DB_PASSWORD,
  database: process.env.SQL_DB_DATABASENAME,
  port: process.env.SQL_DB_PORT
};

const connection = mysql.createConnection(dbConfig);

module.exports = { connection };
