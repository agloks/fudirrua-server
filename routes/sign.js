const router = require("./index.js");
const User = require("../models/usersModel")

/* GET users listing. */
router.get('/sign', function(req, res, next) {
  res.render('sign');
});

router.post('/sign', function(req, res, next) {
  console.log(req.body)
  User.create(req.body)
  res.redirect("/login")
});