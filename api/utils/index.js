const passport = require("passport");
const jwtStrategy = require("./strategies/jwt.strategy");
const localStrategy = require("./strategies/local.strategy");

passport.use(jwtStrategy);
passport.use(localStrategy);

module.exports = passport;
