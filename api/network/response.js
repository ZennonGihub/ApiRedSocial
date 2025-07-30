exports.success = function (req, res, message, status) {
  let statusCode = status || 200;
  let statusMessage = message || "Action completed with succeesfully";
  res.status(statusCode).send({
    status: statusCode,
    body: statusMessage,
    error: false,
  });
};

exports.error = function (req, res, message, status) {
  let statusCode = status || 500;
  let statusMessage = message || "Internal server error";
  res.status(statusCode).send({
    status: statusCode,
    body: statusMessage,
    error: true,
  });
};
