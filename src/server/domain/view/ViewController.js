import getAxios from "../../libs/axios";

export default class ViewController {
  static async home(req, res) {
    if (!req.user) return res.render("login", { pageTitle: "로그인" });

    const axios = getAxios();
    const { data } = await axios.get("/songs");
    const { email, firstName, lastName } = req.user;

    return res.render("home", {
      pageTitle: "Nomad Coder Player",
      songs: data,
      email: email,
      firstName: firstName,
      lastName: lastName,
    });
  }

  static login(req, res) {
    if (req.user) return res.redirect("/");

    return res.render("login", { pageTitle: "로그인" });
  }

  static join(req, res) {
    return res.render("join", { pageTitle: "회원가입" });
  }

  static async popular(req, res) {
    const axios = getAxios();
    const { data } = await axios.get("/songs");
    return res.render("popular", { pageTitle: "인기 차트", chartData: data });
  }

  static async Error_404(req, res, next) {
    return res.status(404).render("404", { pageTitle: "404" });
  }
}
