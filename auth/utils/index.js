require("dotenv").config();
const error = require("../../api/");

const jwt = require("jsonwebtoken");
const config = require("../../config");

async function sign(data) {
  return jwt.sign(data, config.jwtsecret || "titoSoto", { expiresIn: "15m" });
}

function verify(token) {
  return jwt.verify(token, config.jwtsecret);
}
const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    console.log("Decoded: ", decoded);

    if (decoded.sub !== owner) {
      throw error("No puedes ejecutar esta accion", 401);
    }
  },
  logged: function (req) {
    const decoded = decodeHeader(req);
  },
};

function getToken(auth) {
  if (!auth) {
    throw new Error(`No viene un token`);
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw new Error(`Formato invalido `);
  }
  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}
module.exports = {
  sign,
  check,
};
