var mongoose = require('mongoose/'),
    Schema = mongoose.Schema;

var MM = {};
module.exports = MM;
MM.mongoose = mongoose;

mongoose.connect('mongodb://localhost/showshots');
