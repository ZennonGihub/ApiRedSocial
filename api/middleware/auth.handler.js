const boom = require("@hapi/boom");
const { config } = require("./../../config");

function checkApiKey(req, res, next) {
  const apiKey = req.headers["api"];
  // Verifica que en los header de la peticion, venga la api key
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized("No autorizado"));
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    // Verifica que el rol del usuario, sea un rol permitido para la ruta
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized("No autorizado"));
    }
  };
}

module.exports = {
  checkApiKey,
  checkRoles,
};
