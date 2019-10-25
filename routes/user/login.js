const router = require("../index")
const passport = require("passport");

//LOGIN ROUTE
router.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({
        message: 'Something went wrong authenticating user'
      });
      return null;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      // i.g if user incorret
      res.status(401).json(failureDetails);
      return null;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({
          message: 'Session save went bad.'
        });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});


//LOGOUT ROUTE
router.get("/api/logout", (req, res, next) => {
  if(req.isAuthenticated()) {
    req.logout()
    res.status(200).json({logout: "deslogado com sucesso"});
  } else {
    res.status(200).json({logout: "usario nao logado"})
  }
})


//CHECKED LOGGED
router.get('/api/logged', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return null;
  }
  res.status(403).json({
    message: 'Unauthorized'
  });
});