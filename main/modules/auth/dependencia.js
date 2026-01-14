const db = require("../../store/mysql");
const ctrl = require("./services.js");

module.exports = ctrl(db);
