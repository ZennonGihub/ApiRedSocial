require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./openapi.yaml");
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

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Api funcionando de manera exitosa");
  console.log("Api funcionando de manera exitosa");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routerApi(app);

app.use(logsErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(errors);

/*
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
*/
module.exports = app;
