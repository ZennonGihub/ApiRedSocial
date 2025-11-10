require("dotenv").config();
const express = require("express");
const errors = require("./Response/errors");
const cookieParser = require("cookie-parser");
const routerApi = require("./router/index");
const {
  logsErrors,
  boomErrorHandler,
  errorHandler,
} = require("./middleware/error.handler");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(errors);

routerApi(app);
app.use(logsErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
