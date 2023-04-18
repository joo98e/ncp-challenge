import express from "express";
import SongRoute from "./song/song.route";
import UserRoute from "./song/user.route";

const ApiRouter = express.Router();

ApiRouter.use("/songs", SongRoute);
ApiRouter.use("/user", UserRoute);

export default ApiRouter;
