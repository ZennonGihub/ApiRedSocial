const bcrypt = require("bcrypt");
const auth = require("../../auth/utils/index");
const TABLA = "auth";

module.exports = function (injectedDb) {
  let db = injectedDb;
  if (!db) {
    db = require("./../../../store/mysql");
  }
  async function login(username, password) {
    const data = await db.query(TABLA, { username: username });
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
      username: data.username,
      password: data.password,
    };
    console.log(TABLA, authData);
    return db.create(TABLA, authData);
  }
  return {
    create,
    login,
  };
};
