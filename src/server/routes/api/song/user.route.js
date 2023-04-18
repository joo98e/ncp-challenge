import express from "express";
import UserController from "@domain-api/user/user.controller";

const UserRoute = express.Router();

UserRoute.post("/login", UserController.login);
UserRoute.post("/logout", UserController.logout);
UserRoute.get("/login/success", UserController.success);
UserRoute.get("/login/failure", UserController.failure);

UserRoute.post("/join", UserController.join);

export default UserRoute;
