function err(message, code) {
  let errorMessage = new Error(message);

  if (code) {
    errorMessage.statuscode = code;
  }
  return errorMessage;
}

module.exports = err;
