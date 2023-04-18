/* global $ */

/**
 *
 * @type {Song}
 */
let currentSong = {
  title: null,
  artist: null,
  src: null,
  thumbnailSrc: null,
  tags: [],
  totalTime: null,
  likeCount: null,
  viewCount: null,
  createdAt: null,
  updatedAt: null,
};

// global UI Selector
window.addEventListener("load", function () {});

/**
 *
 * @param song {Song}
 */
function setCurrentSong(song) {
  return (currentSong = {
    ...song,
  });
}

/**
 *
 * @param song {Song}
 */
function updateCurrentSongUI(song) {
  $("#song-container .song-thumbnail").attr("src", song.thumbnailSrc);
  $("#song-container .song-title").text(song.title);
  $("#song-container .song-artist").text(song.artist);
  $("#song-container .song-viewCount .count").text(song.viewCount);
  $("#song-container .song-likeCount .count").text(song.likeCount);
}

/**
 * @param scriptUrl {string}
 * @return {void}
 */
function linkScript(scriptUrl) {
  const scriptElement = document.createElement("script");
  scriptElement.src = scriptUrl;
  const target = window.document.querySelector("body");
  target.appendChild(scriptElement);
}

/**
 * @typedef {("main"|"login"|"join")} RouteType
 */

/**
 * @param href {RouteType}
 */
function pushRoute(href) {
  let destination = "";
  switch (href) {
    case "login":
      destination = "/login";
      break;
    case "join":
      destination = "/join";
      break;

    case "main":
      destination = "/";
      break;
    default:
      destination = "/";
      break;
  }
  return (window.location.href = destination);
}
