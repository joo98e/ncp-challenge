import express from "express";
import SongRoute from "./song/songRoute";

const ApiRouter = express.Router();

ApiRouter.use("/song", SongRoute);

export default ApiRouter;
