import express from "express";
import ViewController from "@domain/view/ViewController";

const ViewRouter = express.Router();

ViewRouter.get("/", ViewController.home);
ViewRouter.get("/popular", ViewController.popular);

ViewRouter.use(ViewController.Error_404);

export default ViewRouter;
