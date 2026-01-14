const boom = require("@hapi/boom");
const redis = require("../../store/redis.js");
const TABLA = "posts";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../store/mysql");
  }

  async function list() {
    const cache = await redis.get(TABLA);
    if (cache) {
      return cache;
    }
    const result = await db.list(TABLA);
    if (!result) {
      throw boom.notFound("No se encontraron posts");
    }
    await redis.set(TABLA, result);
    return result;
  }

  async function getPost(id) {
    const cache = await redis.getId(TABLA, id);
    if (cache) {
      return cache;
    }
    const result = await db.get(TABLA, id);
    if (!result) {
      throw boom.notFound("No se encontro el post");
    }
    await redis.set(`${TABLA}:${id}`, result);
    return result;
  }

  async function remove(id) {
    const result = await db.remove(TABLA, id);
    if (!result) {
      throw boom.notFound("No se pudo eliminar el post");
    }
    await redis.removeId(TABLA, id);
    await redis.remove(TABLA);
    return result;
  }

  async function create(user, body) {
    const post = {
      title: body.title,
      body: body.body,
      user_id: user.user_id,
      post_state_id: 1,
    };
    console.log(post);
    const newPost = await db.create(TABLA, post);
    const resultId = newPost.insertId;
    await redis.remove(TABLA);
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
    const result = db.update(TABLA, newPost);
    await redis.removeId(TABLA, id);
    await redis.remove(TABLA);
    return result;
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
