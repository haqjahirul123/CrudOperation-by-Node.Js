
var mongoose = require('mongoose');



var Schema = mongoose.Schema,

ObjectId = Schema.ObjectId;

var searchShema = new Schema({
    boat_name :String,
    boat_price :String,
});

module.exports = mongoose.model('search', searchShema);