const express = require("express");
const config = require("../../config.js");
const router = require("./src/cache.router.js");
const { connect } = require("../store/redis");
const app = express();

app.use(express.json());

const main = async () => {
  try {
    await connect();
    app.use("/", router);
    app.listen(config.redisServicesPort, () => {
      console.log(
        "Microservicio de Redis utilizando el puerto: ",
        config.redisServicesPort
      );
    });
  } catch (err) {
    console.error("Error fatal al iniciar el servicio de Cache:", err);
  }
};

main();

module.exports = app;
