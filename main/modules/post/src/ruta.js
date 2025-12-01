const express = require("express");
const response = require("../../../Response/response.js");
const controller = require("./dependencia.js");
const passport = require("passport");

const router = express.Router();

// Buscar posts
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const lista = await controller.list();
      response.success(req, res, lista, 200);
    } catch (error) {
      next(error);
    }
  }
);
// Buscar 1 post
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await controller.getPost(id);
      response.success(req, res, result, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);
// Actualizar post
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const post = await controller.update(id, body);
      response.success(req, res, post, 200);
    } catch (error) {
      next(error);
    }
  }
);
// Crear post
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      const body = req.body;
      const post = await controller.create(user, body);
      response.success(req, res, post, 201);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

// Eliminar post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const id = req.params.id;
      const postRemoved = await controller.remove(id);
      response.success(req, res, postRemoved, 201);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);
// Like a post
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
