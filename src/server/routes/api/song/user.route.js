import express from "express";
import UserController from "@domain-api/user/user.controller";

const UserRoute = express.Router();

UserRoute.post("/join", UserController.join);

export default UserRoute;
