const bcrypt = require("bcrypt");
const TABLA = "users";
const TABLA_FOLLOW = "follows";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../store/mysql");
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
      username: body.username,
      name: body.name,
      descripcion: body.descripcion,
      id: id,
    };
    return db.update(TABLA, user);
  }

  async function create(body) {
    const user = {
      username: body.username,
      descripcion: body.descripcion || null,
    };
    const userResult = await db.create(TABLA, user);
    const newUserId = userResult.insertId;
    if (body.password && body.username && body.email) {
      const authData = {
        user_id: newUserId,
        email: body.email,
        password_hash: await bcrypt.hash(body.password, 10),
      };
      await db.create("auth", authData);
    }
    return { id: newUserId, ...user };
  }
  async function remove(id) {
    return db.remove(TABLA, id);
  }

  function follow(from, to) {
    return db.create(TABLA_FOLLOW, {
      follow_to: to,
      follow_from: from,
    });
  }
  async function following(user) {
    const join = {};
    join[TABLA] = "follow_to";
    const query = { follow_from: user };
    return await db.query(TABLA_FOLLOW, query, join);
  }
  return {
    getFullDataBase,
    list,
    get,
    update,
    create,
    remove,
    following,
    follow,
  };
};
