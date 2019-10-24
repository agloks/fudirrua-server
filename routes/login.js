const router = require("./index")
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login")
})

// app.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });

router.post('/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
}))

router.get("/user-info", (req, res) => {
  res.send(req.user)
})