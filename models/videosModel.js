const mongoose = require("mongoose")
const Schema = mongoose.Schema

const videosSchema = new Schema({
  tags: [{type: String}],
  videoUrl: String,
  ComediansInVideo: [{type:String}],
  nameVideo: {type : Schema.Types.Mixed},
  genre: String,
  videoDescription: {type : Schema.Types.Mixed},
  location: String,
  idYoutubeVideo: {type : Schema.Types.Mixed},
  datePublication: String,
  nameChannel: {type : Schema.Types.Mixed}
},
{timestamps: true})

const videosModel = mongoose.model("videos", videosSchema)

module.exports = videosModel