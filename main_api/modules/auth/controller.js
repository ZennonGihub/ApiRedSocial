const bcrypt = require("bcrypt");
const auth = require("../../utils/jwt");
const TABLA = "auth";
const boom = require("@hapi/boom");
const config = require("dotenv");

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../../store/mysql");
  }
  async function login(user) {
    console.log("Este es el user: ", user);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.user_id,
    };
    console.log("Payload for JWT:", payload);
    return auth.sign(payload, config.jwtsecret, { expiresIn: "1d" });
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
        throw boom.badRequest(
          "Missing required fields: password, username, or email"
        );
      }
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  async function getByEmail(email) {
    return db.getEmail(TABLA, email);
  }
  async function getUser(id) {
    console.log("Id funcion getUser: ", id);
    return db.getUserId(TABLA, id);
  }
  return {
    createAuth,
    login,
    getByEmail,
    getUser,
  };
};
