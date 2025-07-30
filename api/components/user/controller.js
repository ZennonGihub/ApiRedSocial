const bcrypt = require("bcrypt");
const auth = require("../auth/index");
const TABLA = "user";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("./../../../store/mysql");
  }

  async function getFullDataBase() {
    return db.getFullDb();
  }
  async function list() {
    return db.list(TABLA) || [];
  }

  async function get(id) {
    return db.get(TABLA, id);
  }

  async function update(id, body) {
    const user = {
      ...body,
      id,
    };
    return db.update(TABLA, user);
  }

  async function create(body) {
    const user = {
      username: body.username,
      name: body.name,
    };
    console.log(user);
    if (body.password || body.username) {
      await auth.create({
        username: user.username,
        password: await bcrypt.hash(body.password, 10),
      });
    }
    return db.create(TABLA, user);
  }
  async function remove(id) {
    return db.remove(TABLA, id);
  }

  async function follow(from, to) {
    return db.create(TABLA + "_follow", {
      user_from: from,
      user_to: to,
    });
  }

  return {
    getFullDataBase,
    list,
    get,
    update,
    create,
    remove,
    follow,
  };
};
