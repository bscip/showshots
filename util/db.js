var MM = require('./mongo.js');
var DB = function(){};

DB.prototype.open = function() {
    MM.mongoose.connect('mongodb://localhost/test');
};

DB.prototype.close = function() {
    MM.mongoose.disconnect();
};

DB.prototype.saveArtist = function(params, cb) {
    console.log('HERE');
    console.log(params);
    artist = new MM.Artist(params);
    artist.save(function(err,savedArtist,count) {
        cb(null,count);
    });
};

DB.prototype.findArtist = function(params, cb) {
    MM.Artist.find(params, function(err, artist) {
        cb(null,artist);
    });
};

DB.prototype.removeArtist = function(params, cb) {
    MM.Artist.remove(params, function(err) {
        cb(null);
    });
};

exports.DB = DB;
