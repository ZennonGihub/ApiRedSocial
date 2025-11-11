const TABLA = "comentarios";
const tablaLikeComentarios = "likecomentarios";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../store/mysql");
  }

  async function getFullComments() {
    return db.list(TABLA);
  }
  async function getComment(id) {
    return db.get(TABLA, id);
  }
  async function insertComment(data) {
    return db.upsert(TABLA, data);
  }
  async function deleteComment(id) {
    return db.remove(TABLA, id);
  }
  async function updatedComment(data) {
    return db.upsert(TABLA, data);
  }
  async function likeComment(data) {
    return db.upsert(tablaLikeComentarios, data);
  }
  return {
    getFullComments,
    getComment,
    insertComment,
    deleteComment,
    updatedComment,
    likeComment,
  };
};
