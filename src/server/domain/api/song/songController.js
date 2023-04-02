import Song from "@domain-api/song/song.model";
import { songSeedData } from "../../../../common/seedData/seed";

export default class SongController {
  static async findAll(req, res) {
    const query = await Song.find();
    return res.json(query);
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
        console.log(saveSongs);
        return saveSongs;
      });

      return res.json({ ok: true });
    } catch (e) {
      return res.json({ ok: false });
    }
  }
}
