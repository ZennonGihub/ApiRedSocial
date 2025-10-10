const express = require("express");
const response = require("../api/Response/response");
const db = require("./../store/mysql");

const router = express.Router();

router.get("/:table", async (req, res, next) => {
  const datos = await db.list(req.params.table);
  response.success(req, res, datos, 200);
});

router.get("/:table", async (req, res, next) => {
  const datos = await db.get(req.params.table, req.params.id);
  response.success(req, res, datos, 200);
});

router.post("/", async (req, res, next) => {
  const datos = await db.create(req.params.table, req.body);
  response.success(req, res, datos, 200);
});

router.delete("/:table", async (req, res, next) => {
  const datos = await db.upsert(req.params.table, req.body);
  response.success(req, res, datos, 200);
});

module.exports = router;
