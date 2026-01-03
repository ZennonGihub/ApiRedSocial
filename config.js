require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  // jwt
  jwtsecret: process.env.JWT_SECRET,
  // mysql
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  dbpassword: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  portdb: process.env.DB_PORT,
  // redis
  redisServicesPort: process.env.REDIS_SERVICE_PORT || 3003,
  redisServicesUrl: process.env.REDIS_URL,
  redisServicePass: process.env.REDIS_PASSWORD,
};

module.exports = config;
