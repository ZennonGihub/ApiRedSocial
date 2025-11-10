const express = require("express");
const config = require("../config");
const router = require("./src/cache.router.js");
const { connect } = require("../store/redis");
const app = express();

app.use(express.json());

const main = async () => {
  try {
    console.log("Iniciando servicio de Cache...");

    await connect();
    console.log("Servicio de Cache conectado a Redis exitosamente.");

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
