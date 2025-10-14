const express = require("express");
const response = require("../../api/Response/response.js");
const controller = require("./dependencia.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const lista = await controller.list();
    console.log("Esto esta en let lista: ", lista);
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const body = req.body;
    const post = await controller.update(body);
    response.success(req, res, post, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
