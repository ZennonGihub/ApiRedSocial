const remote = require("./remote");
const config = require("./../config");

module.exports = remote(config.mysqlServiceHost, config.mysqlServicePort);
