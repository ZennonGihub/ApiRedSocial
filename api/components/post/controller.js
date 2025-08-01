const TABLA = "post";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("./../../../store/mysql");
  }

  function list() {
    return db.list(TABLA);
  }

  return {
    list,
  };
};
