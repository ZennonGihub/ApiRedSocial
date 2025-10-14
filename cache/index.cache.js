const express = require("express");
const config = require("../config");
const router = require("./src/cache.router.js");

const app = express();

app.use(express.json());

app.use("/", router);

app.listen(config.redisServicesPort, () => {
  console.log(
    "Microservicio de Redis utilizando el puerto: ",
    config.redisServicesPort
  );
});

module.exports = app;
