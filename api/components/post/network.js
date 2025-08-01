const express = require("express");
const response = require("./../../network/response");
const controller = require("./index.js");

const router = express.Router();

router.get("/listapost", async (req, res, next) => {
  try {
    const lista = await controller.list();
    response.success(req, res, lista, 200);
  } catch (error) {}
});

module.exports = router;
