const config = require("./../../../config");
let db;
if (config.dbRemote === true) {
  db = require("./../../../store/remoteMysql");
} else {
  db = require("./../../../store/mysql");
}

const ctrl = require("./controller");

module.exports = ctrl(db);
