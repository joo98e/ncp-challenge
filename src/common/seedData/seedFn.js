const nodes = document.querySelectorAll(".audio-reactive-track");

function downloadImg(imgSrc, title) {
  let image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imgSrc;
  let fileName = title;
  image.onload = function () {
    let canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.getContext("2d").drawImage(this, 0, 0);

    let link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = fileName;
    link.click();
  };
}

const urls = [];
const titles = [];

for (const element of nodes) {
  try {
    const url = element.getElementsByTagName("img")[0].src;
    const title = element.querySelector(".title a").innerText;

    urls.push(url);
    titles.push(title);
  } catch {}
}
