const db = require("../../../../store/mysql");
//const db = require("../../store/mysql");
const ctrl = require("./controller");

module.exports = ctrl(db);
