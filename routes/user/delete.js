const router = require("../index")
const User = require("../../models/usersModel")

router.delete("/api/user/delete", async (req, res, next) => {
  
  if(req.isAuthenticated()) {

    const userReq = req.user;
    req.logOut(userReq);
    User.findByIdAndDelete(userReq._id)
    .then((s) => res.json({message: "sucesso ao deleta"}))
    .catch((e) => res.send({message: "failha para deleta"}));
    return null
  
  } else {

    res.status(403).json({
      message: 'Unauthorized'
    });

  }

})