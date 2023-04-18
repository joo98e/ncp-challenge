import User from "@domain-api/user/user.model";
import bcrypt from "bcrypt";
import passport from "passport";

export default class UserController {
  static SALT_ROUNDS = 12;

  static async login(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/api/user/login/success",
      failureRedirect: "/api/user/login/failure",
    })(req, res, next);
  }

  static async success(req, res) {
    return res.status(200).send({ ok: true });
  }

  static async failure(req, res, next) {
    passport.authenticate("local", function (err, success, errorMsg) {
      return res.status(401).send({ ok: false, errorMsg: "로그인이 실패했습니다." });
    })(req, res, next);
  }

  static async logout(req, res) {
    req.logout();
    req.session.save((err) => {
      res.redirect("/");
    });
    req.session.destroy();
    return res.redirect("/login");
  }

  // TODO API COMMON RESPONSE TYPE ALIAS
  static async join(req, res) {
    try {
      const { username, email, password, firstName, lastName } = req.body;
      const existUser = await User.findOne({
        $and: [{ email: email }],
      });

      if (existUser) return res.status(500).send({ ok: false, errorMsg: "already exists user email." });

      const hashedPassword = await bcrypt.hash(password, UserController.SALT_ROUNDS);
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        firstName: firstName ?? null,
        lastName: lastName ?? null,
      });

      const document = await newUser.save();

      return res.send({ ok: true, user: document });
    } catch (e) {
      console.log(e);
      return res.send({ ok: false, errorMsg: "unknown error", e: e });
    }
  }
}
