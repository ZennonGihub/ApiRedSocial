const ctrl = require("../post/src/dependencia");
const TABLA = "comentarios";
const tablaLikeComentarios = "likecomentarios";
const boom = require("@hapi/boom");

const table = ["likecomentarios"];

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../../store/mysql");
  }

  async function getFullComments() {
    return db.list(TABLA);
  }
  async function getComment(id, commentId) {
    const post = await ctrl.getPost(tablaPost, id);
    if (!post) {
      throw boom.notFound("Post not found");
    }
    return db.getCommentPost(TABLA, id, commentId);
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
  async function deleteComment(id) {
    return db.remove(TABLA, id);
  }
  async function updatedComment(data) {
    return db.update(TABLA, data);
  }
  async function likeComment(user_id, idcomentario) {
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
