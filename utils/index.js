 
// const request = require('request');
// const cheerio = require('cheerio');
import fs from 'fs';
import request from 'request'
import cheerio from 'cheerio'

const url = 'https://movie.douban.com/top250';

request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const movieList = $('.grid_view .item');
    const movies = [];

    movieList.each((i, el) => {
      const title = $(el).find('.title').text();
      const rating = $(el).find('.rating_num').text();
      const poster = $(el).find('img').attr('src');
      const link = $(el).find('.hd a').attr('href');

      movies.push({
        title,
        rating,
        poster,
        link
      });
    });

    fs.writeFile('movies.json', JSON.stringify(movies), (err) => {
      if (err) throw err;
      console.log('Movies saved!');
    });
  }
});


