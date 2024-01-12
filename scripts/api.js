import { url, options } from "./constants.js";
import { renderCards,} from "./ui.js";

//api işlemleri
export class API {
  constructor() {
    this.songs = [];
  }

  //popüler müzeikler için istek atma
  async getPopuler() {
    try {
      //api isteği atar
      const res = await fetch(url, options);
      const data = await res.json();
      //class'ta tuttuğumuz veriyi günceller

      this.songs = data.tracks;
    } catch (err) {
      console.log("popüler verileri alırken hata oluştu", err);
    }
  }

  //aratılan içeriğe erişme
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=TR&offset=0&limit=20`,
      options
      );

    const data = await res.json();
    
    // bize gelen diziyi işleyeceğiz
    // objelerin içerisindeki track katmanını aradan kaldırıcac
    const newData = data.tracks.hits.map((song) => ({
      ...song.track,
    }));

    // müzikleri ekrana basma
    renderCards(newData);
   
  }
}



