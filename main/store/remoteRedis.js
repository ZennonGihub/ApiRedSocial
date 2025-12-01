const remote = require("./remote");
const config = require("../../config");

module.exports = remote(config.redisServiceHost, config.redisServicePort);
