import SongController from "@domain-api/song/song.controller";

const express = require("express");
const SongRoute = express.Router();

SongRoute.get("/", SongController.findAll);
SongRoute.put("/:id", SongController.findById);
SongRoute.put("/:id/play", SongController.updatePlayCount);

// song data initialize => use once only
SongRoute.get("/plant-seed-data", SongController.plantSeedsData);

export default SongRoute;
