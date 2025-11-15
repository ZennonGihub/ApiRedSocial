const config = require("../../config");
const boom = require("@hapi/boom");

function checkApiKey(req, res, next) {
  const apiKey = req.headers["api"];
  // Verifica que en los header de la peticion, venga la api key
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized("Api key no es valida"));
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      throw boom.unauthorized("No autorizado");
    }
  };
}

module.exports = {
  checkApiKey,
  checkRoles,
};
