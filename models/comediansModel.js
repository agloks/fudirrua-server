const mongoose = require("mongoose")
const Schema = mongoose.Schema

const comediansSchema = new Schema({
  imageUrl: {type: String, default: "images/default-user.png"},
  email: {type : Schema.Types.Mixed},
  cellphone: Number,
  location: String,
  artisticName: {type : Schema.Types.Mixed},
  description: {type : Schema.Types.Mixed},
  genre: String,
  websites: {type : Schema.Types.Mixed},
  facebook:{type : Schema.Types.Mixed},
  instagram:{type : Schema.Types.Mixed},
  agentsInfo: {
    name: String,
    cellphone: Number,
    email: {type : Schema.Types.Mixed}
  },
  likedComedians: [{type: Schema.Types.ObjectId, ref: "comedians"}],
  likedTags: [{type: String}],
  likedVideos: [{type: Schema.Types.ObjectId, ref: "videos"}],
  login: {type : Schema.Types.Mixed},
  password: {type : Schema.Types.Mixed},
  countedLikes: Number,
  themeDisplay: {type: String, default: "default"},
  authenticadMode: {type: String, default: "local"},
},
{timestamps: true})

const comediantsModel = mongoose.model("comediants", comediantsSchema)

module.exports = comediantsModel