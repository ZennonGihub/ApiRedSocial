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
const { connect } = require("../store/redis");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(errors);

const main = async () => {
  await connect();
  app.listen(config.port);
};

main();

routerApi(app);
app.use(logsErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
