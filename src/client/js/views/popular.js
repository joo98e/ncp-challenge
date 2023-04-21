/* global $ */

$(document).ready(function () {
  void renderList();
});

async function renderList() {
  const listsContainer = document.getElementById("list-container");
  const lists = await (await fetch("/api/songs", { method: "GET" })).json();

  try {
    listsContainer.innerHTML = "";
    lists
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 10)
      .forEach(function (list, index) {
        const createElementList = document.createElement("li");
        createElementList.className = index === 0 ? "list-group-item active" : "list-group-item";
        createElementList.innerText = `${index + 1}위 : ${list.title} / ${list.viewCount}`;
        listsContainer.appendChild(createElementList);
      });
  } catch (e) {}
}

/**
 * @param song {string}
 * @returns {Promise<boolean>}
 */
async function handleClickPlay(song) {
  if (typeof song !== "string") return false;
  const parsedSong = JSON.parse(song);

  const audio = "#ncp-song-audio";
  $(audio)[0].setAttribute("src", parsedSong.src);
  $(audio)[0].play();

  const { song: updatedSong } = await updatePlayCount(parsedSong.id);
  updateViewCountUI(parsedSong.id, updatedSong.viewCount);
  setCurrentSong(parsedSong);
  updateCurrentSongUI({
    ...parsedSong,
    viewCount: updatedSong.viewCount,
  });
}

function updateViewCountUI(id, viewCount) {
  try {
    const nextViewCountParagraph = document.querySelector(`.view-count[data-song-id='${id}']`);

    if (nextViewCountParagraph !== null) {
      nextViewCountParagraph.innerHTML = viewCount;
    }

    void renderList();
  } catch (e) {}
}
