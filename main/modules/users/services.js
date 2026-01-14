const boom = require("@hapi/boom");
const redis = require("../../store/redis.js");
const crtl = require("../auth/dependencia");

const TABLA = "users";
const TABLA_FOLLOW = "follows";

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
      throw boom.notFound("Usuarios no encontrados");
    }
    await redis.set(TABLA, result);
    return result;
  }

  async function get(id) {
    const cache = await redis.getId(TABLA, id);
    if (cache) {
      return cache;
    }
    const result = await db.get(TABLA, id);
    if (!result) {
      throw boom.notFound("Usuario no encontrado");
    }
    await redis.set(`${TABLA}:${id}`, result[0]);
    return result[0];
  }

  async function update(id, body) {
    const user = {
      username: body.username,
      name: body.name,
      description: body.description,
      id: id,
    };
    const result = await db.update(TABLA, user);

    await redis.removeId(TABLA, id);
    await redis.remove(TABLA);

    return result;
  }

  async function remove(id) {
    const result = await db.remove(TABLA, id);
    await redis.removeId(TABLA, id);
    await redis.remove(TABLA);
    return result;
  }

  async function follow(from, to) {
    const result = await db.create(TABLA_FOLLOW, {
      follow_to: to,
      follow_from: from,
    });
    console.log("Services: ", "User From:", from, "User To:", to);
    await redis.remove(`${TABLA}:following:${from}`);
    return result;
  }
  async function following(user) {
    const cache = await redis.get(`${TABLA}:following:${user}`);
    if (cache) {
      return cache;
    }
    const join = {};
    join[TABLA] = "follow_to";
    const query = { follow_from: user };
    const result = await db.query(TABLA_FOLLOW, query, join);
    await redis.set(`${TABLA}:following:${user}`, result);

    return result;
  }
  return {
    list,
    get,
    update,
    remove,
    following,
    follow,
  };
};
