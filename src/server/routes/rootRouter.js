import express from "express";
import ApiRouter from "./api";
import { home } from "@controllers/songController";

const rootRouter = express.Router();

rootRouter.use("/api", ApiRouter);

rootRouter.get("/", home);

export default rootRouter;
