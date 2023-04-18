/* global $ */

window.addEventListener("load", function () {
  void playlistUIUpdate();
});

async function generatePlaylist() {
  const playlistTitleInput = $(`input[name="playlist-name"]`);
  const title = playlistTitleInput.val();

  if (!title) return alert("플레이리스트 제목을 입력해 주세요.");

  try {
    const response = await (
      await fetch("/api/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      })
    ).json();

    playlistTitleInput.val("");

    void playlistUIUpdate();
  } catch (e) {
    console.log(e);
  }
}

async function playlistUIUpdate() {
  const { playlists } = await (await fetch("/api/playlist")).json();

  const wrapper = document.querySelector("#playlist-container .playlists");

  wrapper.innerHTML = "";

  playlists.forEach((playlist) => {
    const listElement = document.createElement("li");
    listElement.className = "list";

    const spanElement = document.createElement("span");
    spanElement.innerText = playlist.title;
    const buttonElement = document.createElement("button");
    buttonElement.className = "btn btn-primary flex justify-content-center";
    buttonElement.innerText = ">>";
    buttonElement.addEventListener("click", function () {
      window.location.href = `/playlist/${playlist._id}`;
    });

    listElement.append(spanElement);
    listElement.append(buttonElement);
    wrapper.append(listElement);
  });
}
