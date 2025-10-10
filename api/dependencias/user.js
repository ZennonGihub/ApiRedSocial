const db = require("../../store/remoteMysql");
//const db = require("../../store/mysql");
const ctrl = require("../controllers/users");

module.exports = ctrl(db);
