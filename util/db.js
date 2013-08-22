var MM = require('./mongo.js');
var DB = function(){};

DB.prototype.open = function() {
    MM.mongoose.connect('mongodb://localhost/test');
};

DB.prototype.close = function() {
    MM.mongoose.disconnect();
};

DB.prototype.saveArtist = function(params, cb) {
    artist = new MM.Artist(params);
    artist.save(function(err,savedArtist,count) {
        cb(err,count);
    });
};

DB.prototype.findArtist = function(params, cb) {
    MM.Artist.find(params, function(err, artists) {
        cb(err, artists);
    });
};

DB.prototype.saveShow = function (params, cb) {
    show = new MM.Show(params);
    show.save(function(err,savedShow,count) {
        console.log(err);
        cb(err,count);
    });
};

DB.prototype.findShow = function (params, cb) {
    MM.Show.find(params, function(err, shows) {
        cb(err, shows);
    });
};

DB.prototype.saveImage = function (params, cb) {
    image = new MM.Image(params);
    image.save(function(err,savedImage,count) {
        cb(err,count);
    });
};

DB.prototype.findImage = function (params, cb) {
    MM.Image.find(params, function(err, images) {
        cb(err, images);
    });
};

exports.DB = DB;
