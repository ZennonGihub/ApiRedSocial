const { Strategy } = require("passport-local");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const controller = require("../../controllers/auth");

const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await controller.getuserByEmail(email);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.password;
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);

module.exports = localStrategy;
