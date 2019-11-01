const router = require("../index")
const User = require("../../models/usersModel")

router.put("/api/user/update", async(req, res, next) => {
  const {name, sobrenome, email, login, password, location} = req.body
  let UpdateObj = {}

  if(name !== undefined) {
    if(name.length < 1) {
      const menssageSend = "Deu Ruim, tamanho do nome é menor que 1"
      res.status(400).json({mensage: menssageSend})
      return null;
    } else { UpdateObj.name = name }
  }

  if(sobrenome !== undefined) {
    if(sobrenome.length < 1) {
      const menssageSend = "Deu Ruim, tamanho de sobrenome é menor que 1"
      res.status(400).json({mensage: menssageSend})
      return null;
    } else { UpdateObj.sobrenome = sobrenome }
  }

  if(email !== undefined) {
    if(email.length < 1) {
      const menssageSend = "Deu Ruim, tamanho de sobrenome é menor que 1"
      res.status(400).json({mensage: menssageSend})
      return null;
    } else { UpdateObj.email = email }
  }

  if(password !== undefined) {
    if(password.length < 1) {
      const menssageSend = "Deu Ruim, tamanho de sobrenome é menor que 1"
      res.status(400).json({mensage: menssageSend})
      return null;
    } else { UpdateObj.password = password }
  }

  if(login !== undefined) {
    if(login.length < 1) {
      const menssageSend = "Deu Ruim, tamanho de sobrenome é menor que 1"
      res.status(400).json({mensage: menssageSend})
      return null;
    } else { UpdateObj.login = login }
  }

  if(location !== undefined) {
    if( (location.length < 2) | (location.length > 4) ) {
      const menssageSend = "Deu Ruim, location inválida"
      res.status(400).json({mensage: menssageSend})
      return null;
    } else { UpdateObj.location = location }
  }

  if(req.body.themeDisplay !== undefined) { UpdateObj.themeDisplay = req.body.themeDisplay }

  try{
    const updated = await User.findByIdAndUpdate(req.user._id, UpdateObj)
    const updatedView = await User.findById(updated._id)
    res.status(200).json({user: updatedView})
  } catch {
    res.status(400).json({error: "erro ao fazer update"})
  }

})