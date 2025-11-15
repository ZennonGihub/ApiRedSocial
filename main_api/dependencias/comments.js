const db = require("../../store/mysql");
const ctrl = require("../controllers/comments.js");

module.exports = ctrl(db);
