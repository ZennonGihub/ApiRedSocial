const db = require("../../store/mysql");
//const db = require("../../store/mysql");
const ctrl = require("../src/post.js");

module.exports = ctrl(db);
