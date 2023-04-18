async function renderSongs(alreadyIncludedSongArray) {
  try {
    if (alreadyIncludedSongArray) {
      alreadyIncludedSongArray = alreadyIncludedSongArray.split(",");
    }

    if (!alreadyIncludedSongArray) {
      alreadyIncludedSongArray = [];
    }

    const wrapper = document.querySelector("#playlist-detail-container .playlist-detail-songs");
    const songs = await (await fetch("/api/songs")).json();

    songs.forEach((song) => {
      if (alreadyIncludedSongArray.includes(song.id)) return;

      const listElement = document.createElement("li");
      listElement.className = "list";

      const spanElement = document.createElement("span");
      spanElement.innerText = song.title;
      const buttonElement = document.createElement("button");
      buttonElement.className = "btn btn-primary flex justify-content-center";
      buttonElement.innerText = ">>";
      buttonElement.addEventListener("click", function () {
        playlistAdd(song.id);
      });

      listElement.append(spanElement);
      listElement.append(buttonElement);
      wrapper.append(listElement);
    });
  } catch (e) {
    console.log(e);
  }
}

function getCurrentPlaylistId() {
  return window.location.href.split("/").pop();
}

async function playlistAdd(songId) {
  try {
    const currentPlaylistId = getCurrentPlaylistId();
    const requestBody = {
      playlistId: currentPlaylistId,
      songId: songId,
    };

    await fetch("/api/playlist/add-song", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    void renderSongs();
    void updatePlaylistSongs();
  } catch (e) {}
}

async function updatePlaylistSongs() {
  const currentPlaylistId = getCurrentPlaylistId();
  const res = await (await fetch(`/api/playlist/${currentPlaylistId}`)).json();
  const wrapper = document.querySelector("#playlist-detail-container .playlist-detail-current");

  wrapper.innerHTML = "";
  res.songs.forEach((song) => {
    const listElement = document.createElement("li");
    listElement.className = "list";

    const spanElement = document.createElement("span");
    spanElement.innerText = song.title;
    const buttonElement = document.createElement("button");
    buttonElement.className = "btn btn-primary flex justify-content-center";
    buttonElement.innerText = "재생";
    buttonElement.addEventListener("click", function () {
      handleClickPlay(JSON.stringify(song));
    });

    listElement.append(spanElement);
    listElement.append(buttonElement);
    wrapper.append(listElement);
  });
}
