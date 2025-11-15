const express = require("express");
const config = require("./../config");
const router = require("./src/post.router");
const passport = require("../api/utils/index");
const errors = require("../api/Response/errors");
const cookieParser = require("cookie-parser");
const {
  logsErrors,
  boomErrorHandler,
  errorHandler,
} = require("../api/middleware/error.handler");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/post", router);

app.use(errors);

app.use(passport.initialize());
app.use(logsErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(config.postPort, () => {
  console.log("Microservicio utilizando el puerto: ", config.postPort);
});

module.exports = app;
