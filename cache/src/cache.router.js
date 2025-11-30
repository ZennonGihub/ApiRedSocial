const express = require("express");
const response = require("../../api/Response/response.js");
const store = require("../../store/redis.js");

const router = express.Router();

router.get("/:table", async (req, res, next) => {
  try {
    const table = req.params.table;
    const lista = await store.get(table);
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/:table/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const table = req.params.table;
    const lista = await store.getId(table, id);
    response.success(req, res, lista, 200);
  } catch (error) {
    next(error);
  }
});

router.post("/:table", async (req, res, next) => {
  try {
    const data = req.body;
    const table = req.params.table;
    const result = await store.set(table, data);
    response.success(req, res, result, 201);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
