var APIEchoNest = require('../util/echonest.js'),
    APISongkick = require('../util/songkick.js'),
    APIFlickr   = require('../util/flickr.js');

var DB = require('../util/db.js').DB;
var db = new DB();

var data = {
    "test": [
        {"artist":"radiohead","venue":"O2 Academy"},
        {"artist":"radiohead","venue":"The Fillmore"},
        {"artist":"Pavement","venue":"The Fillmore"}
    ]
};


exports.echonest_artist_search = function(req, res) {
    APIEchoNest.artist_search(req.body.artist_input, function(artists) {
        var ret = false;
        if (artists !== undefined) {
            ret = JSON.parse(artists);
        }
        res.json({
            artists: ret
        });
    });
};

exports.songkick_gigography = function(req, res) {
    APISongkick.artist_gigography(req.body.songkick_id, function(shows) {
        var ret = false;
        if (shows !== undefined) {
            ret = JSON.parse(shows);
        }
        res.json({
            shows: ret
        });
    });
};

exports.flickr_image_search = function(req, res) {
    APIFlickr.image_search(req.body.params, function(images) {
        var ret = false;
        if (images !== undefined) {
            ret = JSON.parse(images);
        }
        res.json({
            images: ret
        });
    });
};

exports.save_artist = function(req, res) {
    db.saveArtist(req.body.params, function(err, count) {
        console.log(err);
        console.log(count);
        console.log('saved an artist');
        res.json({
            count: count
        });
    });
};
