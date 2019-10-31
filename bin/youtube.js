require('dotenv').config();

const {google} = require("googleapis")
const mongoose = require('mongoose');
const Video = require("../models/videosModel")

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOU_KEY
})

//return videos of channel user
class YoutubeApiVideosPlaylist {
  
  constructor() {
    this.result = null
    this.objectResult = {}
    this.pageToken = null
  }

  async resultYoutubeLess(ID, qnt) { 
    try {
      const callApi = await youtube.search.list(
        {
        part: "snippet",
        channelId: ID,
        maxResults: qnt,
        order: "date"
        })
        const returnResult = callApi.data
        this.result = returnResult
        return returnResult.items
    } catch(err) {
      return err
    }
  }

  async resultYoutubeGreater(ID, qnt) { 
    try {
      let executed = false
      for(let x = 0; x <= Math.ceil((qnt/50)) ; x += 1) {
        if(!executed) {
          const callApi = await youtube.search.list(
            {
            part: "snippet",
            channelId: ID,
            maxResults: 50,
            order: "date",
            })
            const returnResult = callApi.data
            this.result = returnResult
            this.pageToken = callApi.data.nextPageToken
            await this.populateDB()
            executed = true
        } else {
          const callApi = await youtube.search.list(
            {
            part: "snippet",
            channelId: ID,
            maxResults: 50,
            order: "date",
            pageToken: this.pageToken
            })
            const returnResult = callApi.data
            this.result = returnResult
            this.pageToken = callApi.data.nextPageToken
            await this.populateDB()
        } 
      }
    } catch(err) {
      return err
    }
  }

  async populateDB() {
    if(this.result !== null) {
      for(let items of this.result.items) {
        this.objectResult.idYoutubeVideo = items.id.videoId
        this.objectResult.videoUrl = `https://www.youtube.com/watch?v=${items.id.videoId}`
        this.objectResult.nameVideo = items.snippet.title
        this.objectResult.datePublication = items.snippet.publishedAt
        this.objectResult.videoDescription = items.snippet.description
        this.objectResult.nameChannel = items.snippet.channelTitle
        this.objectResult.imageUrl = items.snippet.thumbnails.high.url
        // console.log(this.objectResult)

        await Video.create(this.objectResult)
        .then((s) => {console.log(s); this.objectResult = {}; s.ComediansInVideo.push(items.snippet.channelTitle)})
        .catch((e) => {console.log(e); this.objectResult = {}})

      }
    }
    else {
      throw new Error("this.result === null")
    }
  }
}

async function genVideoDB(ID, qnt) {
  await mongoose
  .connect("mongodb://localhost/fudirua", {useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => { console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => { console.error('Error connecting to mongo', err)});
  
  const you = new YoutubeApiVideosPlaylist()
  try {
    if(qnt < 51) {
      await you.resultYoutubeLess(ID, qnt)
      await you.populateDB()
    } else {
      await you.resultYoutubeGreater(ID, qnt)
      await you.populateDB()
    }
  } catch(err) {
    console.log(err)
    return err
  }
}

module.exports = genVideoDB
// genVideoDB("UCCqoc2as2nMEXoZPlwXei4g", 200)