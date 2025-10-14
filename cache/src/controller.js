const TABLA = "post";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../store/mysql");
  }

  async function list() {
    return db.list(TABLA);
  }

  async function remove(id) {
    return db.remove(id, TABLA);
  }

  async function create(body) {
    const post = {
      texto: body.texto,
      user: body.user,
    };
    return db.create(TABLA, post);
  }

  async function update(id, body) {
    const newPost = {
      ...body,
      id,
    };
    return db.update(TABLA, newPost);
  }

  return {
    list,
    remove,
    create,
    update,
  };
};
