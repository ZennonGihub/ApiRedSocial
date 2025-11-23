const express = require("express");
const secure = require("../../middleware/secure");
const response = require("../../Response/response");
const controller = require("../dependencias/user");
const passport = require("passport");
const { checkApiKey } = require("../../middleware/auth.handler");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const list = await controller.list();
    response.success(req, res, list, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});
router.get(
  "/debug",
  passport.authenticate("jwt", { session: false }),
  secure(),
  async (req, res) => {
    try {
      const list = await controller.getFullDataBase();
      response.success(req, res, list, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await controller.get(id);
    response.success(req, res, user, 200);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  secure("update"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const nuevoUser = await controller.update(id, body);
      response.success(req, res, nuevoUser, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.post("/", checkApiKey, async (req, res) => {
  try {
    const body = req.body;
    const nuevoUser = await controller.create(body);
    response.success(req, res, nuevoUser, 201);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
});

router.get("/:id/following", async (req, res, next) => {
  try {
    const userFollowing = await controller.following(req.params.id);
    response.success(req, res, userFollowing, 201);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/follow/:id",
  passport.authenticate("jwt", { session: false }),
  secure("follow"),
  async (req, res) => {
    try {
      const userFrom = req.user.sub;
      const userTo = req.params.id;
      await controller.follow(userFrom, userTo);
      response.success(req, res, null, 201);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  secure("update"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const userRemove = await controller.remove(id);
      response.success(req, res, userRemove, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

module.exports = router;
