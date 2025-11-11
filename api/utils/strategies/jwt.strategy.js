const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");
const controller = require("../../controllers/auth");
const config = require("../../../config");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtsecret,
};
const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await controller.getUser(payload.sub);
    if (!user) {
      return done(boom.unauthorized(), false);
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
module.exports = jwtStrategy;
