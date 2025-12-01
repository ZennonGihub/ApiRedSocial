require("dotenv").config();
const express = require("express");
const errors = require("./Response/errors");
const cookieParser = require("cookie-parser");
const routerApi = require("./router/index");
const passport = require("./utils/index");
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
app.use(passport.initialize());
app.use(logsErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

/*
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
*/
module.exports = app;
