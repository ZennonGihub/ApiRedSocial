const express = require("express");
const config = require("./../config");
const router = require("./db.router");

const app = express();

app.use(express.json());
app.use("/", router);

console.log("Mi config", config);
app.listen(config.mysqlServicePort, () => {
  console.log("servicio listo en el puerto: ", config.mysqlServicePort);
});

module.exports = app;
