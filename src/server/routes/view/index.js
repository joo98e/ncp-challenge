import express from "express";
import ViewController from "@domain/view/ViewController";

const ViewRouter = express.Router();

ViewRouter.get("/", ViewController.home);
ViewRouter.get("/login", ViewController.login);
ViewRouter.get("/join", ViewController.join);
ViewRouter.get("/popular", ViewController.popular);
ViewRouter.get("/playlist", ViewController.playlist);
ViewRouter.get("/playlist/:id", ViewController.playlistDetail);

ViewRouter.use(ViewController.Error_404);

export default ViewRouter;
