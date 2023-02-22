/*express app.js*/
const compression = require('compression') //Compress all routes
var express = require('express'); //require express module
var app = express(); //create an express app object
var bodyParser = require('body-parser'); //require body-parser for parsing form data
var mongoose = require('mongoose'); //require mongoose for database
var passport = require('passport'); //require passport for authentication
var LocalStrategy = require('passport-local'); //require passport-local strategy
var passportLocalMongoose = require('passport-local-mongoose'); //require passport-local-mongoose for authentication
var User = require('./models/user'); //require user model from models/user.js

mongoose.connect('mongodb://localhost/auth_demo_app'); //connect to database auth_demo_app

// example of using a middleware
// app.use(function(req, res, next){
//     console.log('I run for all routes');
//     next();
// });
app.set('view engine', 'ejs'); //set view engine to ejs, so we don't have to type .ejs in our render method calls in our routes file (app.js)
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({ //express-session is a function that returns a middleware


  secret: 'Rusty is the best and cutest dog in the world', //used to encode and decode the session (default: connect.sid)
  resave: false, //forces the session to be saved back to the session store, even if the session was never modified during the request (default: true)
  saveUninitialized: false //  forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with race conditions where a client makes multiple parallel requests without a session. (default: true)
}));

app.use(compression()); //Compress all routes
app.use(passport.initialize()); //initializes passport
app.use(passport.session()); //uses passport to manage sessions
app.use(express.static(__dirname + '/public')); //serves static files
//passport configuration
passport.serializeUser(User.serializeUser()); //read the session, take the data from the session that's encoded and unencode it
passport.deserializeUser(User.deserializeUser()); //take the data from the session that's encoded and unencode it
passport.use(new LocalStrategy(User.authenticate())); //authenticate using local strategy

//================
//ROUTES
//================

app.get('/', function (req, res) { //root route (home page)
  res.render('home'); //render home.ejs file in views folder (home page)

});

app.get('/secret', isLoggedIn, function (req, res) { //secret route (secret page)
  res.render('secret'); //render secret.ejs file in views folder (secret page)
  x
});

//Auth Routes

//show sign up form
app.get('/register', function (req, res) { //register route (register page) (get request)
  res.render('register'); //render register.ejs file in views folder (register page) (get request)

});

//handling user sign up
app.post('/register', function (req, res) { //register route (register page) (post request)
  User.register(new User({username: req.body.username}), req.body.password, function (err, user) { //register new user with username and password (post request)
    if (err) { //if there is an error
      console.log(err); //log the error
      return res.render('register'); //render register.ejs file in views folder (register page)
    }
    passport.authenticate('local')(req, res, function () { //authenticate using local strategy
      res.redirect('/secret'); //redirect to secret page
    });
  });
});

//LOGIN ROUTES
//render login form
app.get('/login', function (req, res) { //login route (login page)
  res.render('login'); //render login.ejs file in views folder (login page)
});

//login logic
//middleware
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}), function (req, res) { //callback function


});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');


});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');

}

app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Server has started');


});

