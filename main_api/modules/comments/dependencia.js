const db = require("../../../store/mysql.js");
const ctrl = require("../controllers/comments.js");

module.exports = ctrl(db);
