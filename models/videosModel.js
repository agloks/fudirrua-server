const mongoose = require("mongoose")
const Schema = mongoose.Schema

const videosSchema = new Schema({
  tags: [{type: String}],
  videoUrl: {type : Schema.Types.Mixed},
  imageUrl: {type : Schema.Types.Mixed},
  comediansInVideo: [{type:String}],
  views: [{type: Schema.Types.ObjectId, ref: "users"}],
  viewsAnonymous: {type: Number, default: 0},
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