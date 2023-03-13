/*express app.js*/
import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import morgan from 'morgan';
import path from "path";

console.log('compression', compression);
const app = express(); //create an express app object
app.use(morgan('combined')); //require morgan for logging
mongoose.connect('mongodb://119.91.252.27/auth_demo_app'); //connect to database auth_demo_app

import errorHandler from './middleware/errorHandler.js';

app.use(passport.initialize()); //initializes passport
// example of using a middleware
app.use(function (req, res, next) {
  console.log('req', req.method, req.url, req.body);
  next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //parse application/json
app.use(compression()); //Compress all routes
const __dirname = path.dirname(new URL(import.meta.url).pathname); // 用 import.meta.url 替换 __dirname
app.use(express.static(__dirname + '/public')); //serves static files
app.use(errorHandler); // 使用错误处理中间件

import usersRouter from './Module/User/User.route.js';
import articlesRouter from './Module/Article/Article.route.js';
import albumsRouter from './Module/Album/Album.route.js';
import commonRouter from './Module/Common/Common.route.js';
import gameRouter from './Module/Game/Game.route.js';
import _21Router from './Module/Game/21/21.route.js';

app.use('/user', usersRouter);
app.use('/article', articlesRouter);
app.use('/album', albumsRouter);
app.use('/common', commonRouter);
app.use('/game/21', _21Router);
app.use('/game', gameRouter);

const config = process.argv.reduce((prev, next, index, arr) => {
  if (index > 1) {
    const arr = next.split('=');
    prev[arr[0]] = arr[1];
  }
  return prev;
}, {});
global.config = config;
app.listen(global.config.PORT || 3000, '', function () {
  console.log('Server has started');
});

