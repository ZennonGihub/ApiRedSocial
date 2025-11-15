const bcrypt = require("bcrypt");
const auth = require("../utils/jwt");
const TABLA = "auth";
const boom = require("@hapi/boom");
const config = require("dotenv");

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../store/mysql");
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

  async function create(data) {
    let authData = {
      email: data.email,
      password: data.password,
    };
    return db.create(TABLA, authData);
  }

  async function getByEmail(email) {
    return db.getEmail(TABLA, email);
  }
  async function getUser(id) {
    console.log("Id funcion getUser: ", id);
    return db.getUserId(TABLA, id);
  }
  return {
    create,
    login,
    getByEmail,
    getUser,
  };
};
