const crtl = require("../auth/dependencia");
const boom = require("@hapi/boom");

const TABLA = "users";
const TABLA_FOLLOW = "follows";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../../store/mysql");
  }

  async function list() {
    const result = await db.list(TABLA);
    if (!result) {
      throw boom.notFound("Usuarios no encontrados");
    }
    return result[0];
  }

  async function get(id) {
    const result = await db.get(TABLA, id);
    if (!result) {
      throw boom.notFound("Usuario no encontrado");
    }
    return result[0];
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
    const authData = {
      user_id: newUserId,
      email: body.email,
      password_hash: body.password,
    };
    await crtl.createAuth(authData);
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
    list,
    get,
    update,
    create,
    remove,
    following,
    follow,
  };
};
