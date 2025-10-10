const express = require("express");
const user = require("./users");
const post = require("./post");
const auth = require("./auth");
//const { checkApiKey } = require("../middleware/auth.handler");

const app = express();
app.use(express.json());

function router(app) {
  const router = express.Router();
  //app.use("/api", router);
  //router.use(checkApiKey);

  router.use("/api/user", user);
  router.use("/api/auth", auth);
  router.use("/api/post", post);
}

module.exports = router;
