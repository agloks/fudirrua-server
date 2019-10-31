const router = require("../index")
const Video = require("../../models/videosModel")
const User = require("../../models/usersModel")
const passport = require("passport")

//salvar o histórico de video do usuario, e de usários que viu o video
router.get("/api/videos/history/save/:videoId/:idUser", async (req, res, next) => {
  const {videoId, idUser} = req.params
  try {
    if( (idUser !== undefined | idUser !== null) ) {
      const VideoFound = await Video.findOneAndUpdate({idYoutubeVideo:videoId})
      await User.findByIdAndUpdate(idUser, {$push: {historyVideos: VideoFound._id}})
      await Video.findOneAndUpdate({idYoutubeVideo:videoId}, {$push: {views: idUser}})
    } else {
      const VideoFound = await Video.findOneAndUpdate({idYoutubeVideo:videoId})
      let numberViewsAnonymos = VideoFound.viewsAnonymous + 1
      await Video.findOneAndUpdate({idYoutubeVideo:videoId}, {viewsAnonymous: numberViewsAnonymos})
    }
    res.status(200).json({sucess: "sucesso ao salvar history"})
  } catch(err) {
    console.log(err)
    res.status(500).json({error: `error ao salva history \n ${err}`})
  }
})