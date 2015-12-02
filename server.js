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

// Use the defined routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('You can use the API on port ' + port);