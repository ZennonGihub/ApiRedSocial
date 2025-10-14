require("dotenv").config();
const express = require("express");
const config = require("./../config");
const errors = require("./Response/errors");
const cookieParser = require("cookie-parser");
const routerApi = require("./router/index");
const {
  logsErrors,
  boomErrorHandler,
  errorHandler,
} = require("./middleware/error.handler");
const connect = require("../store/redis");

connect();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(errors);

app.listen(config.port, () => {
  console.log(`El servidor esta corriendo en el puerto: ${config.port}`);
});

routerApi(app);
app.use(logsErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
