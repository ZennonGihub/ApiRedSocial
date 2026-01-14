const db = require("../../store/mysql.js");
const ctrl = require("./services.js");

module.exports = ctrl(db);
