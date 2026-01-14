const { login, createUser } = require("./controller.js");
const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
router.post("/", createUser);

module.exports = router;
