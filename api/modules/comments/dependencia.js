const db = require("../../../store/mysql.js");
const ctrl = require("./controller.js");

module.exports = ctrl(db);
