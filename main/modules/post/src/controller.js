const TABLA = "posts";
const tablaPost = "post_likes";
const tablaEstado = "post_states";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../../../store/mysql");
  }

  async function list() {
    const result = await db.list(TABLA);
    if (!result) {
      throw boom.notFound("No se encontraron posts");
    }
    return result;
  }

  async function getPost(id) {
    const result = await db.get(TABLA, id);
    if (!result) {
      throw boom.notFound("No se encontro el post");
    }
    return result;
  }

  async function remove(id) {
    const result = await db.remove(TABLA, id);
    if (!result) {
      throw boom.notFound("No se pudo eliminar el post");
    }
    return result;
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
    if (!id || !body) {
      throw boom.badRequest("ID y body son requeridos para actualizar el post");
    }
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
