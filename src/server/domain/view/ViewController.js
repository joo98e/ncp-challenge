import getAxios from "../../libs/axios";

export default class ViewController {
  static async home(req, res) {
    return res.render("home", { pageTitle: "No Capitulate Player" });
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
