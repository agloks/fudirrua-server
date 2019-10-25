const router = require("../index.js");
const User = require("../../models/usersModel")

router.post('/api/signuser', async (req, res, next) => {
  
  const {name, email, password} = req.body

  if(name.length < 1) {
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

  if(password.length < 4) {
    const menssageSend = "Deu Ruim, tamanho da semnha é menor que 4"
    res.status(400).json({mensage: menssageSend})
    return null;
  }

  try {
    const userCreated = await User.create(req.body)
    res.status(200).json({user:userCreated})
    req.login(userCreated, err => { 
      if (err) { res.status(500).json({ message: 'Login after signup went bad.' })}; return null})
    } catch {
    res.status(500).json({error:"error ao criar no servidor"})
  }

});