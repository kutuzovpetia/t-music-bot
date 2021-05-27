const YoutubeMusicApi = require('youtube-music-api');

module.exports =  class Search{
    constructor() {
        this.api = new YoutubeMusicApi()
    }
   async getMusic(name){
        let r = null;
      await this.api.initalize().then(async info=>{
           await this.api.search(name, "song").then(async result => {
                   console.log(result.content);
                   r = await result;
           })
       })
       return r.content;
     }
}