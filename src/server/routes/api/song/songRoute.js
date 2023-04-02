import SongController from "@domain-api/song/songController";

const express = require("express");
const SongRoute = express.Router();

SongRoute.get("/", SongController.findAll);

// song data initialize => use once only
SongRoute.get("/plant-seed-data", SongController.plantSeedsData);

export default SongRoute;
