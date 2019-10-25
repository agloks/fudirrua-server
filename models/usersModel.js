const mongoose = require("mongoose")
const Schema = mongoose.Schema

const usersSchema = new Schema({
  imageUrl: {type: String, default: "images/default-user.png"},
  name: String,
  sobrenome: String,
  email: {type : Schema.Types.Mixed},
  location: String,
  facebook:{type : Schema.Types.Mixed},
  instagram:{type : Schema.Types.Mixed},
  likedComedian: [{type: Schema.Types.ObjectId, ref: "comedians"}],
  likedTags: [{type: String}],
  likedVideos: [{type: Schema.Types.ObjectId, ref: "videos"}],
  login: {type : Schema.Types.Mixed},//necessita remover esse
  password: {type : Schema.Types.Mixed},
  themeDisplay: {type: String, default: "default"},
  authenticadMode: {type: String, default: "local"}
},
{timestamps: true})

const usersModel = mongoose.model("users", usersSchema)

module.exports = usersModel