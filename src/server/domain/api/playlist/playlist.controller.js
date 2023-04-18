import Playlist from "@domain-api/playlist/playlist.model";
import Song from "@domain-api/song/song.model";

export default class PlaylistController {
  static async generate(req, res) {
    try {
      // TODO Should have to generate the Validation Utility function for "req.user"
      // ex: withSessionValidation();

      const { _id } = req.user;
      const { title } = req.body;

      const playlist = new Playlist({
        title: title,
        authorId: _id,
        songs: [],
      });

      const newPlaylist = await playlist.save();
      return res.status(201).send({ ok: true, newPlaylist });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ ok: false });
    }
  }

  static async findAll(req, res) {
    // TODO Should have to generate the Validation Utility function for "req.user"
    // ex: withSessionValidation();

    const { _id } = req.user;

    const playlists = await Playlist.find({
      $and: [{ authorId: _id }],
    }).exec();

    return res.status(200).send({
      playlists: playlists,
    });
  }

  static async add(req, res) {
    const { playlistId, songId } = req.body;

    try {
      const currentPlaylist = await Playlist.findById(playlistId);
      const nextSong = await Song.findById(songId);

      if (!currentPlaylist || !nextSong)
        return res.status(404).json({
          ok: false,
          message: "플레이리스트 혹은 곡이 유효하지 않습니다.",
        });

      currentPlaylist.songs.push(nextSong);
      await currentPlaylist.save();

      return res.status(201).json({ ok: true });
    } catch (e) {}
  }

  static async detail(req, res) {
    const playlistId = req.params.id;

    try {
      const playlist = await Playlist.findById(playlistId);

      if (!playlist) {
        return res.status(404).send({ ok: false, message: "플레이리스트를 찾을 수 없습니다." });
      }

      const songIds = playlist.songs;
      const songs = await Song.find({
        _id: { $in: songIds },
      });

      console.log(songs);

      return res.status(200).send({ ok: true, playlist: playlist, songs: songs });
    } catch (e) {}
  }
}
