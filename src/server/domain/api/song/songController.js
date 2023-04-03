import Song from "@domain-api/song/song.model";
import { songSeedData } from "../../../../common/seedData/seed";

export default class SongController {
  static async findAll(req, res) {
    const query = await Song.find().exec();

    const result = query
      .sort((song) => song.viewCount)
      .map((item) => ({
        id: item._id,
        title: item.title,
        src: `${process.env.SONG_SOURCE_URL}${item.src}`,
        thumbnailSrc: `${process.env.THUMBNAIL_SOURCE_URL}${item.thumbnailSrc}`,
        viewCount: item.viewCount,
      }));

    return res.json(result);
  }

  static async updatePlayCount(req, res) {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) return res.status(404).send({ error: "Song is not found." });

      song.viewCount += 1;
      await song.save();

      return res.send({ message: "Play count updated.", song });
    } catch (e) {
      console.log(e);
      return res.status(500).send({ error: "Server error" });
    }
  }

  static async findById(req, res) {
    try {
      const song = await Song.findById(req.params.id);
      return res.send({ success: true, updatedViewCount: song.viewCount });
    } catch (e) {}
  }

  /**
   * 초기 데이터 초기화용
   * @description use once only
   */
  static async plantSeedsData(req, res) {
    try {
      songSeedData.map(async (seed) => {
        const song = new Song({
          title: seed.title,
          src: seed.src,
          thumbnailSrc: seed.thumbnailSrc,
          viewCount: 0,
        });

        const saveSongs = await song.save();
        return saveSongs;
      });

      return res.json({ ok: true });
    } catch (e) {
      return res.json({ ok: false });
    }
  }
}
