const express = require("express");
const config = require("./../config");
const router = require("./newtwork");

const app = express();

app.use(express.json());
app.use("/", router);

console.log("Mi config", config);
app.listen(config.mysqlService, () => {
  console.log("servicio listo en el puerto: ", config.mysqlService);
});
