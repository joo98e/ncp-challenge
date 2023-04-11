import express from "express";
import getProjectPaths from "../../common/libs/getProjectPaths";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import { localsMiddleware } from "../middlewares";
import layout from "express-ejs-layouts";

export default function getConfiguredApp() {
  const app = express();
  const logger = morgan("dev");

  // view
  app.set("view engine", "ejs");
  app.set("views", getProjectPaths("views"));

  // layout
  app.use(layout);
  app.set("layout", getProjectPaths("layouts") + "/layout");

  // http logger
  app.use(logger);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // static
  app.use("/uploads", express.static("uploads"));
  app.use("/static", express.static(getProjectPaths("static")));
  app.use("/assets", express.static(getProjectPaths("assets")));
  app.use("/bootstrap-icons/", express.static(getProjectPaths("bootstrap-icons")));
  app.use("/js", express.static(getProjectPaths("js")));

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    })
  );

  app.use(flash());
  app.use(localsMiddleware);

  return app;
}
