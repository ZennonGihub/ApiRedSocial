const { Strategy, ExtractJwt } = require("passport-jwt");
const controller = require("../../modules/auth/services.js")();
const config = require("../../../config");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtsecret,
};
const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await controller.getUser(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
module.exports = jwtStrategy;
