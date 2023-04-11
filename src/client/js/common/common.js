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
