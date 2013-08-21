var APIEchoNest = require('../util/echonest.js'),
    APISongkick = require('../util/songkick.js'),
    APIFlickr   = require('../util/flickr.js');

var data = {
    "test": [
        {"artist":"radiohead","venue":"O2 Academy"},
        {"artist":"radiohead","venue":"The Fillmore"},
        {"artist":"Pavement","venue":"The Fillmore"}
    ]
};

var cur_image_set = {};

exports.test = function(req, res) {
    var retdata = [];
    data.test.forEach(function (show,i) {
        retdata.push({id:i+1,artist:show.artist,venue:show.venue});
    });
    res.json({
        shows: retdata
    });
};

exports.testcount = function(req, res) {
    res.json({
        testcount: data.test.length
    });
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
    APISongkick.artist_gigography(req.body.skid, function(shows) {
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
            cur_image_set = images;
            ret = JSON.parse(images);
        }
        res.json({
            images: ret
        });
    });
};

