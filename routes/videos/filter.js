const router = require("../index")
const Video = require("../../models/videosModel")

//requisição da home chumbada
router.get("/api/videos/home", async(req, res, next) => {
  
  try {
    const recentsVideo = await Video.find().sort('-datePublication').limit(20)
    res.status(200).json(recentsVideo)
  } catch(err) {
    res.status(500).json({error: err})
  }
})


// requisição de filtros personalizados
router.post("/api/videos/filter", async(req, res, next) => {
  console.log(req.body)
  let objSend = {}
  for (let item in req.body) {
    if( ((item !== undefined) | item.length !== 0) & (req.body[item] !== "") ) {
      objSend[item] = req.body[item]
    }
  }

  try {
    console.log(objSend)
    const recentsVideo = await Video.find(objSend).sort('-datePublication').limit(20)
    res.status(200).json(recentsVideo)
  } catch(err) {
    console.log(err)
    res.status(500).json({error: err})
  }
})
