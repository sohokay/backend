const passport = require('passport');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../const"); //require passport for authentication
const Strategy = require('passport-http-bearer').Strategy;

passport.use(new Strategy(function (accessToken, done) {
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    console.log('decoded',decoded);
    const user = User.findById(decoded.id)
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err){
    return done(err)
  }
}));

// 身份验证中间件
const authenticate = passport.authenticate('bearer', {session: false});

module.exports = {passport, authenticate}