
var mongoose = require('mongoose');



var Schema = mongoose.Schema,

ObjectId = Schema.ObjectId;

var myuser = new Schema({
    boat_name :String,
    boat_manufractureYear :String,
    boat_price :String,
    boat_sail :String,
    boat_motor :String,
});

module.exports = mongoose.model('users', myuser);