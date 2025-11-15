const express = require("express");
const config = require("./../config");
const router = require("./db.router");

const app = express();

app.use(express.json());
app.use("/", router);

/*app.listen(config.mysqlServicePort, () => {
  console.log(
    "Microservicio corriendo en el puerto: ",
    config.mysqlServicePort
  );
});*/

module.exports = app;
