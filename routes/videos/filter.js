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
  let ordernation = "-datePublication"
  for (let item in req.body) {

    if(item === "datePublication") {
      if(req.body[item] === "Mais antigos primeiro") {
        ordernation = "datePublication"
      }
      req.body[item] = ""
    }

    if( ((item !== undefined) | item.length !== 0) & (req.body[item] !== "") ) {

      if(item === "nameVideo" | item === "location") {
         let strTemp = ""
         let arrayChar = req.body[item].split("")
         for(let k of arrayChar) {
           strTemp += `(${k}|${k.toUpperCase()})`
         } 
         objSend[item] = new RegExp(`${strTemp}`) 
         }

      else if(item === "tags") {
        let strTemp = ""
        let arrayTags = req.body[item].split(",")
        for(let k = 0; k < arrayTags.length; k++) {
          if(k === 0) {
            strTemp += `(${arrayTags[k]})`
          } else if(k !== arrayTags.length) {
            strTemp += `|(${arrayTags[k]})`
          }
          objSend[item] = new RegExp(`${strTemp}`)
        }
      }

      else { objSend[item] = new RegExp(`(${req.body[item]})`) }
    }

  }

  try {
    const recentsVideo = await Video.find(objSend).sort(ordernation).limit(20)
    res.status(200).json(recentsVideo)
  } catch(err) {
    console.log(err)
    res.status(500).json({error: err})
  }
})
