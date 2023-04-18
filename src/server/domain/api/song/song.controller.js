import Song from "@domain-api/song/song.model";
import { songSeedData } from "../../../../common/seedData/seedData.js";

export default class SongController {
  static async findAll(req, res) {
    const query = await Song.find().exec();

    const result = query
      .sort((song) => song.viewCount)
      .map((item) => ({
        id: item._id,
        title: item.title,
        artist: item.artist,
        src: `${process.env.SONG_SOURCE_URL}${item.src}`,
        thumbnailSrc: `${process.env.THUMBNAIL_SOURCE_URL}${item.thumbnailSrc}`,
        tags: item.tags,
        totalTime: item.totalTime,
        likeCount: item.likeCount,
        viewCount: item.viewCount,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
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
          artist: seed.artist,
          src: seed.src,
          thumbnailSrc: seed.thumbnailSrc,
          tags: seed.tags,
          totalTime: seed.totalTime,
          likeCount: 0,
          viewCount: 0,
        });

        return await song.save();
      });

      return res.json({ ok: true });
    } catch (e) {
      return res.json({ ok: false });
    }
  }
}
