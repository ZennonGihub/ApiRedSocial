const express = require("express");
const secure = require("./secure");
const response = require("./../../network/response");
const controller = require("./index.js");

const router = express.Router();

router.get("/", secure(), async (req, res) => {
  try {
    const list = await controller.list();
    response.success(req, res, list, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});
router.get("/debug", secure(), async (req, res) => {
  try {
    const list = await controller.getFullDataBase();
    response.success(req, res, list, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.get("/:id", secure(), async (req, res) => {
  try {
    const id = req.params.id;
    const user = await controller.get(id);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.patch("/:id", secure("update"), async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const nuevoUser = await controller.update(id, body);
    response.success(req, res, nuevoUser, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.post("/", secure(), async (req, res) => {
  try {
    const body = req.body;
    const nuevoUser = await controller.create(body);
    response.success(req, res, nuevoUser, 201);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.get("/:id/following", secure("follow"), async (req, res, next) => {
  try {
    const userFollowing = await controller.following(req.params.id);
    response.success(req, res, userFollowing, 201);
  } catch (error) {
    next(error);
  }
});

router.post("/follow/:id", secure("follow"), async (req, res) => {
  try {
    const userFrom = req.user.sub;
    console.log("ID THE USERFROM", userFrom);
    const userTo = req.params.id;
    console.log("ID USER TO", userTo);
    await controller.follow(userFrom, userTo);
    response.success(req, res, null, 201);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.delete("/:id", secure(), async (req, res) => {
  try {
    const id = req.params.id;
    const userRemove = await controller.remove(id);
    response.success(req, res, userRemove, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

module.exports = router;
