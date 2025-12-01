const ctrl = require("../post/src/dependencia");
const TABLA = "comments";
const tablaLikeComentarios = "comment_likes";
const boom = require("@hapi/boom");
const tablaPost = "posts";

const table = ["post_likes"];

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../../store/mysql");
  }

  async function getFullComments() {
    {
      const result = await db.list(TABLA);
      console.log("El resultado de getFullComments es:", result);
      if (!result) {
        throw boom.notFound("Comentarios no encontrados");
      }
    }
    return result;
  }
  async function getComment(id, commentId) {
    const post = await ctrl.getPost(tablaPost, id);
    if (!post) {
      throw boom.notFound("Post no encontrado");
    }
    const result = await db.getCommentPost(TABLA, id, commentId);
    if (!result) {
      throw boom.notFound("Comentario no encontrado");
    }
    return result[0];
  }
  async function createComment(id, user, data) {
    const comment = {
      comentario: data.comentario,
      post_id: id,
      user_id: user.user_id,
    };
    const newComment = await db.create(TABLA, comment);
    const resultId = newComment.insertId;
    return { id: resultId, ...comment };
  }
  async function deleteComment(id, commentId) {
    const post = await ctrl.getPost(tablaPost, id);
    if (!post) {
      throw boom.notFound("Post no encontrado");
    }
    const result = await db.getCommentPost(TABLA, id, commentId);
    if (!result) {
      throw boom.notFound("Comentario no encontrado");
    }
    const deletedComment = await db.remove(TABLA, result[0]);
    return result[0];
  }
  async function updatedComment(data) {
    if (!data) {
      throw boom.badRequest("No viene informacion");
    }
    const result = await db.update(TABLA, data);
    return result[0];
  }
  async function likeComment(data) {
    if (!tablesList.includes(table)) {
      throw boom.badData("Table not allowed");
    }
    try {
      const { user_id, idcomentario } = data;
      const result = await pool.query(`INSERT INTO ${table} SET ?`, [
        user_id,
        idcomentario,
      ]);
      return result[0];
    } catch (error) {
      throw boom.badRequest(error.message);
    }
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
