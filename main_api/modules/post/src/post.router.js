const express = require("express");
const response = require("../../api/Response/response.js");
const controller = require("./dependencia.js");
const passport = require("passport");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const lista = await controller.list();
      console.log("Esto esta en let lista: ", lista);
      response.success(req, res, lista, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await controller.get(id);
      response.success(req, res, result, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const body = req.body;
      const post = await controller.update(body, body.id);
      response.success(req, res, post, 200);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/crear",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      console.log("Este es el user en post router:", user);
      const body = req.body;
      const post = await controller.create(user, body);
      response.success(req, res, post, 201);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.post(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const post = await controller.insertForeignKey(id, req.body);
      response.success(req, res, post, 201);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
