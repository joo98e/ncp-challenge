import getAxios from "../../libs/axios";

export default class ViewController {
  static async home(req, res) {
    const axios = getAxios();
    const { data } = await axios.get("/song");
    return res.render("home", { pageTitle: "Home", chartData: data });
  }

  static async Error_404(req, res, next) {
    return res.status(404).render("404", { pageTitle: "404" });
  }
}
