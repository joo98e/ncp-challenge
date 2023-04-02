export default class ViewController {
  static async home(req, res) {
    return res.render("home", { pageTitle: "Home" });
  }

  static async Error_404(req, res, next) {
    return res.status(404).render("404", { pageTitle: "404" });
  }
}
