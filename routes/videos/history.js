const router = require("../index")
const Video = require("../../models/videosModel")
const User = require("../../models/usersModel")

//salvar o histórico de video do usuario, e de usários que viu o video
router.get("/api/videos/history/save/:videoId", async (req, res, next) => {
  const {videoId} = req.params
  try {
    if(req.isAuthenticated()) {
      const userId = req.user._id
      await User.findByIdAndUpdate(userId, {$push: {historyVideos: videoId}})
      await Video.findByIdAndUpdate(videoId, {$push: {views: userId}})
    } else {
      const VideoFound = await Video.findById(videoId)
      let numberViewsAnonymos = VideoFound.viewsAnonymous + 1
      await Video.findByIdAndUpdate(videoId, {viewsAnonymous: numberViewsAnonymos})
    }
    res.status(200).json({sucess: "sucesso ao salvar history"})
  } catch(err) {
    res.status(500).json({error: `error ao salva history \n ${err}`})
  }
})