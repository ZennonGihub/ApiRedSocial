require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  // jwt
  jwtsecret: process.env.JWT_SECRET,
  // mysql
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  dbpassword: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  portdb: process.env.DB_PORT,
  // microservicio mysql
  mysqlServicePort: process.env.MYSQ_SERVICE_PORT || 3001,
  mysqlServiceHost: process.env.MYSQ_SERVICE_HOST || "localhost",
  // microservicio de post
  postPort: process.env.POST_PORT || 3002,
  postHost: process.env.POST_HOST || "localhost",
  // microservicio de redis
  redisServicesPort: process.env.REDIS_SERVICE_PORT || 3003,
  redisServicesUrl: process.env.REDIS_URL,
  redisServicePass: process.env.REDIS_PASSWORD,
  redisServicePort: process.env.REDIS_SERVICE,
  redisServiceHost: process.env.REDIS_SERVICE_HOST,
};

module.exports = config;
