const router = require("../index.js");
const User = require("../../models/usersModel")

router.post('/api/user/sign', async (req, res, next) => {
  
  const {name, email, password, login} = req.body

  if(name !== undefined) {
    if(name.length < 1) {
      const menssageSend = "Deu Ruim, tamanho de nome é menor que 1"
      res.status(400).json({mensage: menssageSend})
      return null;
    }
  } else {
    const menssageSend = "Deu Ruim, tamanho de nome é menor que 1"
    res.status(400).json({mensage: menssageSend})
    return null;
  }
  
  const emailExist = await User.findOne({email: email}) 
  if(emailExist) {
    const menssageSend = "Deu Ruim, email ja existe"
    res.status(400).json({mensage: menssageSend})
    return null;
  }

  const loginExist = await User.findOne({login: login}) 
  if(loginExist) {
    const menssageSend = "Deu Ruim, login ja existe"
    res.status(400).json({mensage: menssageSend})
    return null;
  }

  if(password !== undefined) {
    if(password.length < 4) {
      const menssageSend = "Deu Ruim, tamanho da semnha é menor que 4"
      res.status(400).json({mensage: menssageSend})
      return null;
    }
  } else {
    const menssageSend = "Deu Ruim, tamanho da semnha é menor que 4"
    res.status(400).json({mensage: menssageSend})
    return null;
  }
  

  try {
    const userCreated = await User.create(req.body)
    req.login(userCreated, (err) => { 
      if (err) { res.status(500).json({ message: 'Login after signup went bad.' })}; return null})
    res.status(200).json({user:userCreated})
    } catch {
    res.status(500).json({error:"error ao criar no servidor"})
  }

});