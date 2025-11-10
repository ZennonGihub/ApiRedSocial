const express = require("express");
const user = require("./users");
const auth = require("./auth");
//const { checkApiKey } = require("../middleware/auth.handler");

const app = express();
app.use(express.json());

function routerApi(app) {
  const router = express.Router();
  router.use(checkApiKey);
  app.use("/api", router);
  router.use("/api/user", user);
  router.use("/api/auth", auth);
}

module.exports = routerApi;
