import express from "express";
import SongRoute from "./song/song.route";
import UserRoute from "./user/user.route";
import PlaylistRoute from "./playlist/playlist.route";

const ApiRouter = express.Router();

ApiRouter.use("/songs", SongRoute);
ApiRouter.use("/user", UserRoute);
ApiRouter.use("/playlist", PlaylistRoute);

export default ApiRouter;
