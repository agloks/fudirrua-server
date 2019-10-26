const mongoose = require("mongoose")
const Schema = mongoose.Schema

const videosSchema = new Schema({
  tags: [{type: String}],
  videoUrl: {type : Schema.Types.Mixed},
  imageUrl: {type : Schema.Types.Mixed},
  ComediansInVideo: [{type:String}],
  nameVideo: {type : Schema.Types.Mixed},
  genre: String,
  videoDescription: {type : Schema.Types.Mixed},
  location: String,
  idYoutubeVideo: {type : Schema.Types.Mixed},
  datePublication: {type : Schema.Types.Mixed},
  nameChannel: {type : Schema.Types.Mixed}
},
{timestamps: true})

const videosModel = mongoose.model("videos", videosSchema)

module.exports = videosModel