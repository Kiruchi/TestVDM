var request = require('request');
var cheerio = require('cheerio');

var pageNumber = 0;
var url = 'http://www.viedemerde.fr/?page=' + pageNumber;
var classPosts = '.article';

var vdmPosts = [];

request(url, function(error, response, html){
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        var posts = $(classPosts);
        $(posts).each(function (i, post) {
            console.log($(post).text());
        });
    } else {
        console.log("Oops, I can't access " + url);
    }
});