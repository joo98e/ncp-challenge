import express from "express";
import getProjectPaths from "../../common/libs/getProjectPaths";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import { localsMiddleware } from "../middlewares";

export default function getConfiguredApp() {
  const app = express();
  const logger = morgan("dev");

  // view
  app.set("view engine", "ejs");
  app.set("views", getProjectPaths("views"));

  // http logger
  app.use(logger);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

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
