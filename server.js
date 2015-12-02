var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// POST configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // Use the environment variable PORT or 8080 by default
var router = express.Router(); // Express router instance
var db = mongoose.connect('mongodb://localhost:27017/testVDM'); // Connect to the MongoDB database
var Post = require('./app/models/post');

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to my VDM api!' });
});

router.get('/posts', function(req, res) {
    // Parsing query parameters
    var search = {};
    if(req.query.author) {
        search.author = req.query.author;
    }
    if(req.query.from && req.query.to) {
        search.date = { $gte : req.query.from, $lte : req.query.to };
    } else if(req.query.from) {
        search.date = { $gte : req.query.from };
    } else if(req.query.to) {
        search.date = { $lte : req.query.to };
    }

    Post.find(search,{'_id' : 0},function(err, posts) {
        if(err) {
            res.send(err);
        }
        res.json({
            "posts" : posts,
            "count" : posts.length
        })
    });
});

router.get('/posts/:id', function(req, res) {
    Post.find({ id : req.params.id},{'_id' : 0},function(err, posts) {
        if(err) {
            res.send(err);
        }
        res.json({
            "posts" : posts,
            "count" : posts.length
        })
    });
});

// Use the defined routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('You can use the API on port ' + port);