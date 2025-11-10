const TABLA = "comentarios";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../store/mysql");
  }

  async function getFullComments(TABLA) {
    return db.list();
  }
  async function getComment(TABLA, id) {
    return db.get(TABLA, id);
  }
  async function insertComment(TABLA, data) {
    return db.upsert(TABLA, data);
  }
  async function deleteComment(TABLA, id) {
    return db.remove(TABLA, id);
  }
  async function updatedComment(TABLA, data) {
    return db.upsert(TABLA, data);
  }
  return {
    getFullComments,
    getComment,
    insertComment,
    deleteComment,
    updatedComment,
  };
};
