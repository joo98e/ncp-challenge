import express from "express";
import UserController from "@domain-api/user/user.controller";
import PlaylistController from "@domain-api/playlist/playlist.controller";

const PlaylistRoute = express.Router();

/**
 * 유저의 플레이리스트 모두 찾기
 */
PlaylistRoute.get("/", PlaylistController.findAll);

/**
 * 유저의 새로운 플레이 리스트 생성하기
 */
PlaylistRoute.post("/", PlaylistController.generate);

/**
 * 유저의 플레이 리스트에 곡 추가 하기
 */
PlaylistRoute.post("/add-song", PlaylistController.add);

/**
 * 유저의 플레이 리스트 곡 정보 조회하기
 */
PlaylistRoute.get("/:id", PlaylistController.detail);

export default PlaylistRoute;
