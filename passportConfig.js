const collections = require("./models/authModel");

// const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
exports.initializingPassport = (passport) => {
  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await collections.findOne({ email: email });
        if (!user) return done(null, false);
        if (user.password !== password) return done(null, false);
        return done(ull, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (user, done) => {
    try {
      const user = await collections.findById(id);

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
