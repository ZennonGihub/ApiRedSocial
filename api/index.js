require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const errors = require("../main/Response/errors.js");
const cookieParser = require("cookie-parser");
const routerApi = require("../main/router/index");
const passport = require("../main/utils/index");
const {
  logsErrors,
  boomErrorHandler,
  errorHandler,
} = require("../main/middleware/error.handler");

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(errors);

routerApi(app);
app.use(passport.initialize());
app.use(logsErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const swaggerDocument = YAML.load(path.join(__dirname, "../main/openapi.yaml"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
*/
module.exports = app;
