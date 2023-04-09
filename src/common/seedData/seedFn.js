// https://pixabay.com/ko/music/search/?order=ec

const nodes = document.querySelectorAll(".audio-reactive-track");

const songInfos = [];

function getSongInfos() {
  for (const element of nodes) {
    try {
      const nextState = {};

      const imgTag = element.querySelector("img");
      const titleTag = element.querySelector(".title a.name");
      const artistTag = element.querySelector(".title h3.artist");
      const audioDownloadTag = element.querySelector("a.audio-download");
      const total = element.querySelector(".total");
      const tags = element.querySelectorAll(".tags a");
      const tagText = [];

      for (const tag of tags) {
        const text = tag.innerText;
        const resultText = text.replace(/\s|\n/, "").trim();
        tagText.push(resultText);
      }

      const totalTime = total.innerText;
      const minutes = totalTime.split(":")[0] * 60;
      const seconds = totalTime.split(":")[1];

      if (minutes < 360 && minutes > 60) {
        nextState.totalTime = Number(minutes) + Number(seconds);

        if (titleTag) {
          nextState.title = titleTag.innerText;
        }

        if (artistTag) {
          nextState.artist = artistTag.innerText;
        }

        if (imgTag) {
          nextState.thumbnailSrc = `${titleTag.innerText}_thumbnail.png`;
          nextState.thumbnailRequestUrl = imgTag.getAttribute("src");
        }

        if (!imgTag) {
          nextState.thumbnailRequestUrl = null;
        }

        if (audioDownloadTag) {
          nextState.src = `${titleTag.innerText}.mp3`;
          nextState.mp3RequestUrl = audioDownloadTag.getAttribute("href");
        }

        if (tags) {
          nextState.tags = tagText;
        }

        songInfos.push(nextState);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

async function downloadFile(info) {
  if (!info.mp3RequestUrl) return;

  return await fetch(info.mp3RequestUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${info.title}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch((error) => console.error(error));
}

function downloadFiles(infos) {
  return infos.reduce((prev, info) => {
    return prev.then(async () => {
      return await downloadFile(info);
    });
  }, Promise.resolve());
}

async function downloadThumbnail(info) {
  if (!info.thumbnailRequestUrl) return;

  return await fetch(info.thumbnailRequestUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${info.title}_thumbnail.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch((error) => console.error(error));
}

function downloadThumbnails(infos) {
  return infos.reduce((prev, info) => {
    return prev.then(async () => {
      return await downloadThumbnail(info);
    });
  }, Promise.resolve());
}

getSongInfos();
console.log(songInfos);

function run() {
  downloadFiles(songInfos);
  downloadThumbnails(songInfos);
}
