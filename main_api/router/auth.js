const express = require("express");
const response = require("../Response/response.js");
const controller = require("../dependencias/auth.js");
const passport = require("passport");

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      const userToken = await controller.login(user);
      response.success(req, res, userToken, 201);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

module.exports = router;
