const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/usersModel")

module.exports = new LocalStrategy(
  //modify username default for you desire
  {
    usernameField: "email"
  },
  //params is referent name of send in form
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { console.log("here error strategy passport 0"); return done(err); }
      if (!user) {
        console.log("here error strategy passport 1")
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        console.log("here error strategy passport 2")
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log("sucess LocalStrategy")
      return done(null, user);
    });
  }
);