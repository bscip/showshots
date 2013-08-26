// require the initial mongoose wrapper
var MM = require('./mongo');

// require the models we want to use:
MM.Artist   = require('../models/artist');
MM.Show     = require('../models/show');
MM.Image    = require('../models/image');

var DB = (function () {
    var opened = false;
    var config = {
        db_address: ''
    };

    var DB = function(params) {
        if (params.db_address !== undefined) {
            config.db_address = params.db_address;
        }
    };

    DB.prototype.constructor = DB;

    DB.prototype.open = function() {
        if (config.db_address !== undefined) {
            MM.mongoose.connect(config.db_address);
            opened = true;
        }
    };

    DB.prototype.close = function() {
        MM.mongoose.disconnect();
        opened = false;
    };

    DB.prototype.saveArtist = function(params, cb) {
        artist = new MM.Artist(params);
        artist.save(function(err,savedArtist,count) {
            cb(err,savedArtist);
        });
    };

    DB.prototype.findArtists = function(params, cb) {
        MM.Artist.find(params, function(err, artists) {
            cb(err, artists);
        });
    };

    DB.prototype.saveShow = function (params, cb) {
        show = new MM.Show(params);
        show.save(function(err,savedShow,count) {
            cb(err,savedShow);
        });
    };

    DB.prototype.findShows = function (params, cb) {
        MM.Show.find(params, function(err, shows) {
            cb(err, shows);
        });
    };

    DB.prototype.saveImage = function (params, cb) {
        image = new MM.Image(params);
        image.save(function(err,savedImage,count) {
            cb(err,savedImage);
        });
    };

    DB.prototype.findImages = function (params, cb) {
        MM.Image.find(params, function(err, images) {
            cb(err, images);
        });
    };


    DB.prototype.findSample = function(cb) {
        var artist_ids = [];
        var artists = [];
        var ret_artists = [];

        MM.Image.aggregate(
            {$group:{_id:'$songkick_id', count: {$sum:1}}},
            {$sort: {count:-1}},
            {$limit: 3},
            function(err,res) {
                res.forEach(function(r,i) {
                    artist_ids.push(r._id);
                    artists[r._id] = r;
                });
                MM.Artist.where('songkick_id').in(artist_ids).exec(function(aerr,ares) {
                   ares.forEach(function(ar,ai) {
                       ret_artists.push({
                           echo_nest_id:  ar.echo_nest_id,
                           songkick_id:  ar.songkick_id,
                           name:  ar.name,
                           image_count:  artists[ar.songkick_id].count
                       });
                   });
                   cb(err,ret_artists);
                });
            });

    };
    
    return DB;
}());

module.exports = DB;
