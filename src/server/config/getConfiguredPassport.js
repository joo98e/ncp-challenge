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
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });

          if (!user) {
            return done(null, false, { message: "존재하지 않는 사용자입니다." });
          }

          const result = await user.validPassword(password);

          if (!result) {
            return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }

          return done(null, user, { ok: true, user });
        } catch (error) {
          return done(error, false, { message: "unknown error" });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("로그인 성공 시 유저 정보 세션에 저장하는 기능");
    done(null, user._id);
  });

  passport.deserializeUser(async (_id, done) => {
    console.log("로그인 성공한 유저에게 실행되는 함수");

    console.log(1);
    try {
      console.log(2);
      const user = await User.findById(_id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  return passport;
}

export default getConfiguredPassport;
