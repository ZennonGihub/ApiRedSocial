const TABLA = "posts";
const tablaPost = "likepost";
const tablaEstado = "estadopost";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../../../store/mysql");
  }

  async function list() {
    return db.list(TABLA);
  }

  async function getPost(id) {
    return db.get(TABLA, id);
  }

  async function remove(id) {
    return db.remove(id, TABLA);
  }

  async function create(user, body) {
    const resultEstado = await db.create(tablaEstado, { estado: "activo" });
    const newEstadoId = resultEstado.insertId;
    const post = {
      title: body.title,
      body: body.body,
      user_id: user.user_id,
      estadoPost_id: newEstadoId,
    };
    const newPost = await db.create(TABLA, post);
    const resultId = newPost.insertId;
    return { resultId, ...post };
  }

  async function update(id, body) {
    const newPost = {
      ...body,
      id,
    };
    return db.update(TABLA, newPost);
  }

  async function insertForeignKey(tablaPost, body) {
    return db.create(tablaPost, body);
  }

  return {
    list,
    getPost,
    remove,
    create,
    update,
    insertForeignKey,
  };
};
