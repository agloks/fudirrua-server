// require('dotenv').config();

// const {google} = require("googleapis")
// const mongoose = require('mongoose');
// const Video = require("../models/videosModel")


// async function genVideoDB(ID, qnt) {
//   // await mongoose
//   // .connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true })
//   // .then(x => { console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
//   // .catch(err => { console.error('Error connecting to mongo', err)});
  
//   // const you = new YoutubeApiVideosPlaylist()

//   const youtube = google.youtube({
//     version: "v3",
//     auth: process.env.YOU_KEY
//   })

//   try {
//     const callApi = await youtube.channels.list(
//       {
//       part: "brandingSettings",
//       channelId: ID,
//       // maxResults: 10,
//       order: "date"
//       })
//       const returnResult = callApi.data
//       console.log(returnResult)
//       this.result = returnResult
//       return returnResult.items
//   } catch(err) {
//     console.log(err)
//     return err
//   }
// }


// module.exports = genVideoDB
// genVideoDB("UCCqoc2as2nMEXoZPlwXei4g", 200)