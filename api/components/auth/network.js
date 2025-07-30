const express = require("express");
const response = require("./../../network/response");
const controller = require("./index");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const userToken = await controller.login(body.username, body.password);
    response.success(req, res, userToken, 201);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

module.exports = router;
