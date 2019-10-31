const router = require("../index")
const Video = require("../../models/videosModel")
const youtube = require("../../bin/youtube")

router.post("/api/videos/add", async(req, res) => {
  const {idyou, quanty} = req.body
  if( (idyou !== "") & (quanty !== undefined) ) {
    try {
      const sucessDb = await youtube(idyou, quanty)
      res.status(200).json({sucess: "sucess"})
    } catch(err) {
      const sucessDb = {error: err}
      res.status(500).json(sucessDb)
    }
  } else {
    const sucessDb = {error: "campos invalidos"}
    res.status(400).json(sucessDb)
  }
})

router.post("/api/videos/edit", async(req, res) => {
  let {nameVideo, tags, genre} = req.body
  if(nameVideo !== undefined) {
    try {
      const titleRegex = new RegExp(`(${nameVideo})`)
      const videoOriginal = await Video.findOne({nameVideo: titleRegex})
      if((genre !== videoOriginal.genre) && (videoOriginal !== null) && (genre !== undefined)) {genre = genre} else { genre = videoOriginal.genre }
      const videoFound = await Video.findOneAndUpdate({nameVideo: titleRegex}, {$push: {tags: tags}, genre: genre})
      console.log(videoOriginal)
      res.json({sucess: videoFound})
    } catch(err) {
      console.log(err)
      res.status(500).json({error: err})
    }
  }
})