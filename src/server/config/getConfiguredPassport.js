import passport from "passport";
import LocalStrategy from "passport-local";
import User from "@domain-api/user/user.model";

/**
 *
 * @returns {Authenticator}
 */
function getConfiguredPassport() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username: username });
          if (!user) {
            return done(null, false, { message: "존재하지 않는 사용자입니다." });
          }
          const result = await user.checkPassword(password);

          if (result) {
            return done(null, user);
          }

          return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  return passport;
}

export default getConfiguredPassport;
