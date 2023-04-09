void renderList();

async function renderList() {
  const listsContainer = document.getElementById("list-container");
  const lists = await (await fetch("/api/songs", { method: "GET" })).json();

  listsContainer.innerHTML = "";

  lists
    .sort((a, b) => b.viewCount - a.viewCount)
    .forEach(function (list, index) {
      const createElementList = document.createElement("li");
      createElementList.className = index === 0 ? "list-group-item active" : "list-group-item";
      createElementList.innerText = `${index + 1}위 : ${list.title} / ${list.viewCount}`;
      listsContainer.appendChild(createElementList);
    });
}

async function handleClickPlay(id, src) {
  if (typeof src !== "string") return false;

  const audio = document.getElementById("ncp-song-audio");
  audio.src = src;
  audio.play();

  const { song } = await updatePlayCount(id);
  updateViewCountUI(id, song.viewCount);
}

function updateViewCountUI(id, viewCount) {
  const nextViewCountParagraph = document.querySelector(`.view-count[data-song-id='${id}']`);
  nextViewCountParagraph.innerText = viewCount;

  renderList();
}
