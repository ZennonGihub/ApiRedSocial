const TABLA = "post";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("./../../../store/mysql");
  }

  function list() {
    return db.list(TABLA);
  }

  function remove(id) {
    return db.remove(id, TABLA);
  }

  function create(body) {
    const post = {
      texto: body.texto,
      user: body.user,
    };

    return db.create(TABLA, post);
  }

  return {
    list,
    remove,
    create,
  };
};
