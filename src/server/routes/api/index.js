import express from "express";
import TestRoute from "./test";

const ApiRouter = express.Router();

ApiRouter.use("/test", TestRoute);

export default ApiRouter;
