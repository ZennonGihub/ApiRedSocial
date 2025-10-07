const express = require("express");
const response = require("../../../api/network/response.js");
const controller = require("./index.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const lista = await controller.list();
    response.success(req, res, lista, 200);
  } catch (error) {}
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const post = await controller.create(body);
    response.success(req, res, post, 200);
  } catch (error) {}
});

module.exports = router;
