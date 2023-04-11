/* global $ */

function hideAllTab() {
  $(".main-tab").hide();
}

function handleClickViewPlayList() {
  hideAllTab();
  $(".main-tab-1").show();
}

function handleClickViewPlayer() {
  hideAllTab();
  $(".main-tab-2").show();
}

function handleClickViewPopularList() {
  hideAllTab();
  $(".main-tab-3").show();
}

$(document).ready(function () {
  $(".button-1").on("click", handleClickViewPlayList);
  $(".button-2").on("click", handleClickViewPlayer);
  $(".button-3").on("click", handleClickViewPopularList);
});
