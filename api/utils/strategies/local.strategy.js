const { Strategy } = require("passport-local");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const controller = require("../../../store/mysql");

const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await controller.getEmail("auth", email);
      console.log("User found:", user);
      if (!user) {
        return done(boom.unauthorized(), false);
      }
      console.log("Comparing passwords", password);
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return done(boom.unauthorized(), false);
      }
      delete user.password_hash;
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);

module.exports = localStrategy;
