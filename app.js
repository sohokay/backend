/*express app.js*/
import compression from 'compression';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import pkg from 'pg'
import passport from 'passport';
import morgan from 'morgan';
import path from "path";
import cors from 'cors';
import dotenv from 'dotenv';
import __dirname from './utils/dirname.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
    },
  },
  apis: ['./Module/**/*.js'], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(swaggerOptions);
// 根据环境变量加载不同的环境变量文件
// const envFile = path.join(__dirname,`/./.env.${process.env.NODE_ENV}`);
// console.log('envFile', envFile);
// dotenv.config({path: envFile});
// dotenv.config({path: path.join(__dirname, '/./.env.development')});
dotenv.config({path: path.join(__dirname, '/./.env.development')});
// console.log('dotenv', dotenv);
// console.log('process.env', process.env);
console.log('compression', compression);

const {Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})
console.log('pool', pool);

// const pgClient = new Client({
//   user: process.env.POSTGRES_USER,
//   host: process.env.POSTGRES_HOST,
//   database: process.env.POSTGRES_DATABASE,
//   password: process.env.POSTGRES_PASSWORD,
// });





const app = express(); //create an express app object
app.use(cors()); //use cors
app.use(morgan('combined')); //require morgan for logging
mongoose.set('strictQuery', false); //allow query without schema
console.log('process.env.DB_CONNECTION_STRING', process.env.DB_CONNECTION_STRING);
mongoose.connect(process.env.DB_CONNECTION_STRING); //connect to database auth_demo_app

import errorHandler from './middleware/errorHandler.js';

app.use(passport.initialize()); //initializes passport
// example of using a middleware
app.use(function (req, res , next) {// log each request to the console
  console.log('req', req.method, req.url, req.body);
  next();
});
app.use(bodyParser.urlencoded({extended: true}));// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json
app.use(compression()); //Compress all routes
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.get('*', (req, res) => {
  res.send('Hello World!');
} );






const config = process.argv.reduce((prev, next, index, arr) => {
  if (index > 1) {
    const arr = next.split('=');
    prev[arr[0]] = arr[1];
  }
  return prev;
}, {});
// console.log('config',config)
global.config = config;
app.listen(global.config.PORT || 3000, '', function () {
  console.log('Server has started');
});

