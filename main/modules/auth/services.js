const bcrypt = require("bcrypt");
const auth = require("../../utils/jwt");
const TABLA = "auth";
const TABLA_USERS = "users";
const boom = require("@hapi/boom");
const config = require("dotenv");

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../store/mysql");
  }
  async function login(user) {
    if (!user) {
      throw boom.notFound("Usuario no encontrado");
    }
    const payload = {
      sub: user.user_id,
    };
    return auth.sign(payload, config.jwtsecret, { expiresIn: "1d" });
  }

  async function create(body) {
    const user = {
      username: body.username,
      description: body.description || null,
    };
    const userResult = await db.create(TABLA_USERS, user);
    const newUserId = userResult.insertId;
    const authData = {
      user_id: newUserId,
      email: body.email,
      password_hash: body.password,
    };
    await this.createAuth(authData);
    return { id: newUserId, ...user };
  }

  async function createAuth(data) {
    try {
      if (data.password_hash && data.email && data.user_id) {
        const authData = {
          user_id: data.user_id,
          email: data.email,
          password_hash: await bcrypt.hash(data.password_hash, 10),
        };
        return db.create(TABLA, authData);
      } else {
        throw boom.badRequest("Se requiere contraseña y email");
      }
    } catch (error) {
      throw boom.badRequest("Error al crear la autenticación");
    }
  }

  async function getByEmail(email) {
    if (!email) throw boom.badRequest("Se requiere el email");
    return db.getEmail(TABLA, email);
  }
  async function getUser(id) {
    if (!id) throw boom.badRequest("Se requiere el id");
    return db.getUserId(TABLA, id);
  }
  return {
    createAuth,
    login,
    getByEmail,
    getUser,
    create,
  };
};
