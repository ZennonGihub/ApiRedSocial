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

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await controller.get(id);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const body = req.body;
    const post = await controller.update(body, body.id);
    response.success(req, res, post, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
