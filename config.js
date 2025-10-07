require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  jwtsecret: process.env.JWT_SECRET || "titoSoto",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  dbpassword: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  portdb: process.env.DB_PORT,
  mysqlService: process.env.MYSQ_SERVICE_PORT || 3001,
  mysqlServiceHost: process.env.MYSQ_SERVICE_HOST || "localhost",
  postPort: process.env.POST_PORT || 3002,
  dbRemote: process.env.DB_REMOTE || false,
};

module.exports = config;
