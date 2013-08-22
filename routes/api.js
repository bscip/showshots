var APIEchoNest = require('../util/echonest.js'),
    APISongkick = require('../util/songkick.js'),
    APIFlickr   = require('../util/flickr.js');

var DB = require('../util/db.js').DB;
var db = new DB();


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
    var songkick_id = req.body.params.songkick_id;
    db.findArtists({'songkick_id':songkick_id}, function(err, found) {
        if (!found.length) {
            db.saveArtist(req.body.params, function(err, count) {
                res.json({
                    count: count
                });
            });
        }
        else {
            res.json({
                count: found.length
            });
        }
    });
};

exports.save_show = function(req, res) {
    var check = {
        'songkick_id': req.body.params.songkick_id,
        'songkick_event_id': req.body.params.songkick_event_id
    };
    db.findShows(check, function(err, found) {
        if (!found.length) {
            db.saveShow(req.body.params, function(err, count) {
                res.json({
                    count: count
                });
            });
        }
        else {
            res.json({
                count: found.length
            });
        }
    });
};

exports.save_image = function(req, res) {
    var check = {
        'songkick_id': req.body.params.songkick_id,
        'songkick_event_id': req.body.params.songkick_event_id,
        'flickr_id': req.body.params.flickr_id
    };
    db.findImages(check, function(err, found) {
        if (!found.length) {
            db.saveImage(req.body.params, function(err, count) {
                res.json({
                    count: count
                });
            });
        }
        else {
            res.json({
                count: found.length
            });
        }
    });
};

exports.find_artists = function(req, res) {
    db.findArtists(req.body.params, function(err, artists) {
        res.json({
            artists: artists
        });
    });
};

exports.find_shows = function(req, res) {
    db.findShows(req.body.params, function(err, shows) {
        res.json({
            shows: shows
        });
    });
};

exports.find_images = function(req, res) {
    db.findImages(req.body.params, function(err, shows) {
        res.json({
            images: images
        });
    });
};
