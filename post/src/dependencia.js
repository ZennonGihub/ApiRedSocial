const db = require("../../store/mysql");
//const db = require("../../store/mysql");
const ctrl = require("../src/controller.js");

module.exports = ctrl(db);
