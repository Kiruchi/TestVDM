var request = require('request');
var cheerio = require('cheerio');

var url = 'http://www.viedemerde.fr/?page=';
var classPosts = '.article';

var vdmPosts = [];
var id = 0;

// Scraping 10 first pages
for (var nbPage = 0; nbPage < 10; nbPage++) {
    var urlSpec = url + nbPage;

    // Do a GET to the URL
    request(urlSpec, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var posts = $(classPosts);
            $(posts).each(function () {
                // Increment id
                id++;

                // Scraping data with Cheerio
                var curPost = $(this);

                // Get post content
                var contentPost = curPost.children('p').text();
                // Get infos (date & author)
                var infos = curPost.children('.date').children('.right_part').children('p').eq(1).text();
                // Parse date to the right format
                var mySplit = infos.split('Le ')[1].split(' à ');
                var date = mySplit[0];
                var heure = mySplit[1];
                mySplit = heure.split(' - ');
                heure = mySplit[0];
                var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
                var arrayDate = date.match(pattern);
                var datePost = arrayDate[3] + "-" + arrayDate[2] + "-" + arrayDate[1] + " " + heure + ":00";
                // Parse author
                var author = mySplit[2].split('par ')[1].split(' ')[0];

                var newItem = {
                    id: id,
                    content: contentPost,
                    date: datePost,
                    author: author,
                };

                vdmPosts.push(newItem);
            });
            console.log(vdmPosts);
        } else {
            console.log("Oops, I can't access " + url);
        }
    });
}