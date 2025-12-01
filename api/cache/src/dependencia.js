const db = require("../../store/remoteRedis");
//const db = require("../../store/mysql");
const ctrl = require("./controller");

module.exports = ctrl(db);
