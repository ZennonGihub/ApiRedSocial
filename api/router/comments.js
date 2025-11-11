const express = require("express");
const response = require("../Response/response.js");
const controller = require("../dependencias/comments.js");
const { checkRoles } = require("../middleware/auth.handler.js");

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
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(),
  async (req, res) => {
    try {
      const id = req.params.id;
      const result = await controller.getComment(id);
      response.success(req, res, result, 200);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles(),
  async (req, res) => {
    try {
      const body = req.body;
      const newComment = await controller.insertComment(body);
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
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  checkRoles(),
  async (req, res) => {
    try {
      const id = req.params.id;
      const likedComment = await controller.likeComment(id, req.body);
      response.success(req, res, likedComment, 201);
    } catch (error) {
      response.error(req, res, error.message, 500);
    }
  }
);

module.exports = router;
