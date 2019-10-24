const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminsSchema = new Schema({
  imageUrl: {type: String, default: "images/default-user.png"},
  name: String,
  sobrenome: String,
  login: {type : Schema.Types.Mixed},
  password: {type : Schema.Types.Mixed},
  themeDisplay: {type: String, default: "default"}
},
{timestamps: true})

const adminsModel = mongoose.model("admins", adminsSchema)

module.exports = adminsModel