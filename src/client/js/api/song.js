async function updatePlayCount(songId) {
  try {
    return await (await fetch(`/api/songs/${songId}/play`, { method: "PUT" })).json();
  } catch (e) {
    console.log(e);
  }
}
