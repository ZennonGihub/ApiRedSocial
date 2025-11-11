const bcrypt = require("bcrypt");
const auth = require("../utils/jwt");
const TABLA = "auth";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("../../store/mysql");
  }
  async function login(email, password) {
    const data = await db.query(TABLA, { email: email });
    const comparePass = await bcrypt.compare(password, data.password);
    console.log(comparePass);
    if (comparePass === true) {
      const payload = {
        sub: data.id,
        role: data.role,
      };
      return auth.sing(payload);
    } else {
      throw new Error(`Error en la validacion del usuario`);
    }
  }

  async function create(data) {
    let authData = {
      email: data.email,
      password: data.password,
    };
    console.log(TABLA, authData);
    return db.create(TABLA, authData);
  }

  async function getEmail(email) {
    return db.get(TABLA, id);
  }
  return {
    create,
    login,
    getEmail,
  };
};
