const express = require("express");
const user = require("../modules/users/ruta.js");
const auth = require("../modules/auth/ruta.js");
const post = require("../modules/post/ruta.js");
const comments = require("../modules/comments/ruta.js");
const { checkApiKey } = require("../middleware/auth.handler");

const app = express();
app.use(express.json());

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/user", user);
  router.use("/post", post);
  router.use("/comments", comments);
  router.use("/auth", auth);
}

module.exports = routerApi;
