import User from "@domain-api/user/user.model";
import bcrypt from "bcrypt";

export default class UserController {
  static SALT_ROUNDS = 12;

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
