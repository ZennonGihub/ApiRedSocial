const response = require("./response");
module.exports = function errors(err, req, res, next) {
  const message = err.message || "Internal server error";
  console.log("Este es el error");
  const status = err.statusCode || 500;

  response.error(req, res, message, status);
};
