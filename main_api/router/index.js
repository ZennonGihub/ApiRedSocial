const express = require("express");
const user = require("./users");
const auth = require("./auth");
const comments = require("./comments");
const { checkApiKey } = require("../middleware/auth.handler");

const app = express();
app.use(express.json());

function routerApi(app) {
  const router = express.Router();
  router.use(checkApiKey);
  app.use("/api/v1", router);
  router.use("/user", user);
  router.use("/comments", comments);
  router.use("/auth", auth);
}

module.exports = routerApi;
