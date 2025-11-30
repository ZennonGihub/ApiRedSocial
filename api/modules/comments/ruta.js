const express = require("express");
const response = require("../../Response/response.js");
const controller = require("./dependencia.js");
const { checkRoles } = require("../../middleware/auth.handler.js");
const passport = require("passport");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles(),
  async (req, res) => {
    try {
      const list = await controller.getFullComments();
      response.success(req, res, list, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.get(
  "/:id/:comment",
  passport.authenticate("jwt", { session: false }),
  checkRoles(),
  async (req, res) => {
    try {
      const id = req.params.id;
      const comment = req.params.comment;
      const result = await controller.getComment(id, comment);
      response.success(req, res, result, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.post(
  "/:post/crear",
  passport.authenticate("jwt", { session: false }),
  checkRoles(),
  async (req, res) => {
    try {
      const id = req.params.post;
      const user = req.user;
      const body = req.body;
      const newComment = await controller.createComment(id, user, body);
      response.success(req, res, newComment, 201);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(),
  async (req, res) => {
    try {
      const id = req.params.id;
      const deletedComment = await controller.deleteComment(id);
      response.success(req, res, deletedComment, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(),
  async (req, res) => {
    try {
      const body = req.body;
      const updatedComment = await controller.updatedComment(id, body);
      response.success(req, res, updatedComment, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.post(
  "/:user/:id/like",
  passport.authenticate("jwt", { session: false }),
  checkRoles(),
  async (req, res) => {
    try {
      const idcomentario = req.params.id;
      const id = req.user;
      const likedComment = await controller.likeComment(id, idcomentario);
      response.success(req, res, likedComment, 201);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

module.exports = router;
