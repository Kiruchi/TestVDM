var express = require('express');
var app = express();
var mongoose = require('mongoose');

var port = process.env['PORT'] || 8080; // Use the environment variable PORT or 8080 by default
var router = express.Router(); // Express router instance

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/testVDM');

// Get the Post Model
var Post = require('./app/models/post');

// Say hello when clients access the API
router.get('/', function (req, res) {
    res.json({message: 'Welcome to my VDM api!'});
});

// Get posts
router.get('/posts', function (req, res) {
    // Parsing query parameters
    // If parameters are provided, they are added to the search array which we pass to the MongoDB query to filter
    var search = {};
    if (req.query.author) {
        search.author = req.query.author;
    }
    if (req.query.from && req.query.to) {
        search.date = {$gte: req.query.from, $lte: req.query.to};
    } else if (req.query.from) {
        search.date = {$gte: req.query.from};
    } else if (req.query.to) {
        search.date = {$lte: req.query.to};
    }

    // Query to MongoDB with the right filter
    // We don't need MongoDB's _id so we specify not to return it
    Post.find(search, {'_id': 0}, function (err, posts) {
        if (err) {
            res.send(err);
        }
        // We return the posts in the wanted format
        res.json({
            "posts": posts,
            "count": posts.length
        })
    });
});

// Get posts by id
router.get('/posts/:id', function (req, res) {
    // We pass the id as a filter in the query
    // We don't need MongoDB's _id so we specify not to return it
    Post.find({id: req.params.id}, {'_id': 0}, function (err, posts) {
        if (err) {
            res.send(err);
        }
        // We return the posts in the wanted format
        res.json({
            "posts": posts,
            "count": posts.length
        })
    });
});

// Use the defined routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('You can use the API on port ' + port);
