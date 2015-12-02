var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
    id: Number,
    content: String,
    date: String,
    author: String
});

module.exports = mongoose.model('Post', PostSchema);