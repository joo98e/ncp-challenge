import express from "express";
import SongRoute from "./song/songRoute";

const ApiRouter = express.Router();

ApiRouter.use("/songs", SongRoute);

export default ApiRouter;
