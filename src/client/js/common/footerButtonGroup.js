/* global $ */

function handleClickViewPlayList() {
  window.location.href = "/playlist";
}

function handleClickViewPlayer() {
  window.location.href = "/";
}

function handleClickViewPopularList() {
  window.location.href = "/popular";
}

$(document).ready(function () {
  $(".button-1").on("click", handleClickViewPlayList);
  $(".button-2").on("click", handleClickViewPlayer);
  $(".button-3").on("click", handleClickViewPopularList);
});
