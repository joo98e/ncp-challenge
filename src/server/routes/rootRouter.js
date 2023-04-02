import express from "express";
import ApiRouter from "./api";
import ViewRouter from "./view";

const rootRouter = express.Router();

rootRouter.use("/api", ApiRouter);
rootRouter.use(ViewRouter);

export default rootRouter;
