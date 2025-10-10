const db = require("../../store/mysql");
const ctrl = require("../controllers/auth");

module.exports = ctrl(db);
