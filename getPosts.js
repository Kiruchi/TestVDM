var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/testVDM'); // Connect to the MongoDB database
var url = 'http://www.viedemerde.fr/?page=';
var classPosts = '.article';
var nbPostsWanted = 200;
var postsByPage = 13;
var nbPage = Math.floor(nbPostsWanted / postsByPage) + 1;
var id = 0;
var Post = require('./app/models/post');

console.log("This script will get the " + nbPostsWanted + " last VDM posts and save them in MongoDB.");
console.log("Dropping previous collection...");

// We drop the previous posts
Post.collection.drop(function (err) {
    if (err) {
        console.log("No collection dropped, ok if it is the first time you run this script.")
    }
});

console.log("Gathering VDM posts...");

// Scraping n first pages
for (var i = 0; i < nbPage; i++) {

    // Request the right URL for the page i
    var urlSpec = url + i;

    // Do a GET to the URL
    request(urlSpec, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var vdmPosts = [];
            // Use Cheerio as a server-side JQuery-like
            var $ = cheerio.load(html);
            var posts = $(classPosts);
            // Use the right selector to get the posts
            $(posts).each(function () {
                // Continue if we still have posts to save
                if (id !== nbPostsWanted) {
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
                    var author = mySplit[2].split('par ')[1];
                    author = author.split(' (homme)')[0];
                    author = author.split(' (femme)')[0];
                    author = author.trim();

                    // Creating a new item with the right parameters
                    var newItem = {
                        id: id + 1,
                        content: contentPost,
                        date: datePost,
                        author: author
                    };

                    // Adding this item to this page's posts array
                    vdmPosts.push(newItem);

                    // Increment id
                    id++;
                }
            });

            // Insert this page's posts in MongoDB
            Post.collection.insert(vdmPosts, function (err) {
                // Say if there is an error
                if (err) {
                    console.log("Error inserting posts");
                } else {
                    // Stop if we have saved nbPostsWanted objects
                    if (id == nbPostsWanted) {
                        console.log("VDM posts successfully saved !");
                        // Disconnect MongoDB
                        db.disconnect();
                    }
                }
            });
        } else {
            // Network error
            console.log("Oops, I can't access " + url);
        }
    });
}
