const response = require("../../Response/response.js");
const controller = require("./dependencia.js");

const list = async (req, res, next) => {
  try {
    const list = await controller.getFullComments();
    response.success(req, res, list, 200);
  } catch (error) {
    next(error);
  }
};

const getOneComment = async (req, res, next) => {
  try {
    const id = req.params.idPost;
    const comment = req.params.comment;
    const result = await controller.getComment(id, comment);
    response.success(req, res, result, 200);
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const id = req.params.post;
    const user = req.user;
    const body = req.body;
    const newComment = await controller.createComment(id, user, body);
    response.success(req, res, newComment, 201);
  } catch (error) {
    next(error);
  }
};
const removeComment = async (req, res, next) => {
  try {
    const id = req.params.idPost;
    const comment = req.params.comment;
    const result = await controller.deleteComment(id, comment);
    response.success(req, res, result, 200);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedComment = await controller.updatedComment(id, body);
    response.success(req, res, updatedComment, 200);
  } catch (error) {
    next(error);
  }
};

const likeComment = async (req, res, next) => {
  try {
    const idcomentario = req.params.id;
    const id = req.user;
    const likedComment = await controller.likeComment(id, idcomentario);
    response.success(req, res, likedComment, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  getOneComment,
  createComment,
  removeComment,
  updateComment,
  likeComment,
};
