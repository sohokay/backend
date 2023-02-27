/*express app.js*/
const compression = require('compression') //Compress all routes
const express = require('express'); //require express module
const app = express(); //create an express app object
app.use(require('morgan')('combined')); //require morgan for logging
const bodyParser = require('body-parser'); //require body-parser for parsing form data
const mongoose = require('mongoose'); //require mongoose for database
mongoose.connect('mongodb://119.91.252.27/auth_demo_app'); //connect to database auth_demo_app
const {passport} = require('./middleware/passport');
app.use(passport.initialize()); //initializes passport
// example of using a middleware
app.use(function (req, res, next) {
  console.log('I run for all routes');
  next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //parse application/json

app.use(compression()); //Compress all routes
app.use(express.static(__dirname + '/public')); //serves static files
const usersRouter = require('./routes/users');
app.use('/user', usersRouter);
app.get('/api', isLoggedIn, function (req, res) {
  res.json({
    message: 'Welcome to the coolest API on earth!'
  });
})

function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated(),'req.isAuthenticated()');
  if (req.isAuthenticated()) {
    return next();
  }
  res.json({
    message: "You need to be logged in to see this."
  });
}

app.listen(process.env.PORT || 3000, '', function () {
  console.log('Server has started');


});

