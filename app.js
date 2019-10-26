require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

mongoose
  .connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => { console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)})
  .catch(err => { console.error('Error connecting to mongo', err)});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Passport
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session)
const User = require("./models/usersModel")

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(session({
  secret: "lchost",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 1 * 60 * 60//1 hora
  })
}));

const authLocal = require("./auth/authLocal")
passport.use(authLocal)

app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'FudiRua';

// users routes
const deleteUserRoute = require("./routes/user/delete")
const updateUserRoute = require("./routes/user/update")
const signRoute = require("./routes/user/sign")
const loginRoute = require("./routes/user/login")
// videos routes
const videosRoutes = require("./routes/videos/filter")
// index
const index = require('./routes/index');
app.use('/', index);


module.exports = app;
