const TABLA = "comentarios";
const tablaPost = "posts";
const tablaLikeComentarios = "likecomentarios";
const boom = require("@hapi/boom");

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../store/mysql");
  }

  async function getFullComments() {
    return db.list(TABLA);
  }
  async function getComment(id, commentId) {
    const post = await db.get(tablaPost, id);
    if (!post) {
      throw boom.notFound("Post not found");
    }
  }
  async function createComment(id, user, data) {
    const comment = {
      comentario: data.comentario,
      post_id: id,
      user_id: user.user_id,
    };
    console.log("Este es el comentario: ", comment);
    const newComment = await db.create(TABLA, comment);
    const resultId = newComment.insertId;
    return { id: resultId, ...comment };
  }
  async function deleteComment(id) {
    return db.remove(TABLA, id);
  }
  async function updatedComment(data) {
    return db.update(TABLA, data);
  }
  async function likeComment(data) {
    return db.upsert(tablaLikeComentarios, data);
  }
  return {
    getFullComments,
    getComment,
    createComment,
    deleteComment,
    updatedComment,
    likeComment,
  };
};
