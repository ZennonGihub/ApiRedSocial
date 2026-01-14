const db = require("../../store/mysql");
const ctrl = require("./services");

module.exports = ctrl(db);
