const router = require("../index")
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login")
})

router.post('/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
}))

router.get("/user-info", (req, res) => {
  res.status(200).json(req.user)
})