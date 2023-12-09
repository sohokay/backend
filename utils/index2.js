// 用node写一个爬虫,需要爬取所有的豆瓣电影的电影名字和评分
// 1.引入模块

// const request = require('request');
// const cheerio = require('cheerio');
// const fs = require('fs');
// const iconv = require('iconv-lite');
// const url = require('url');
// const async = require('async');
// const debug = require('debug')('crawl:main');
// const Movie = require('../model');
// const debug = require('debug')('crawl:write');
// const Movie = require('../model');


// 2.定义变量
// const url = 'https://movie.douban.com/top250';
// const result = [];
// const start = 0;
// const limit = 25;
// const total = 250;
// const url = 'https://movie.douban.com/top250';


// 3.定义函数
// function read(url, callback) {
//   request({url, encoding: null}, function (err, response, body) {
//     body = iconv.decode(body, 'utf8');
//     let $ = cheerio.load(body);
//     let items = [];
//     $('.grid_view .item').each(function () {
//       let $this = $(this);
//       let movie = {};
//       movie.name = $this.find('.title').text();
//       movie.score = $this.find('.rating_num').text();
//       movie.poster = $this.find('.pic img').attr('src');
//       movie.url = $this.find('.hd a').attr('href');
//       movie.url = url.resolve(url, movie.url);
//       items.push(movie);
//     });
//     callback(err, items);
//   });
// }

// function write(items, callback) {
//   async.forEach(items, function (item, cb) {
//     Movie.create(item, cb);
//   }, callback);
// }

// function start() {
//   async.whilst(function () {
//     return start < total;
//   }, function (cb) {
//     async.waterfall([
//       function (callback) {
//         let newUrl = url + '?start=' + start;
//         read(newUrl, callback);
//       },
//       function (items, callback) {
//         write(items, callback);
//       }
//     ], function (err, result) {
//       start += limit;
//       cb();
//     });
//   }, function (err) {
//     debug('全部写入完毕');
//   });
// }

// 4.导出
// module.exports = start;



