var secret = require('./secret.js');
var request = require('request');

var APIEchoNest = {};
module.exports = APIEchoNest;

APIEchoNest.artist_search = function (artist_input, cb) {
    var url = 'http://developer.echonest.com/api/v4/artist/search?';
        url += 'api_key='+secret.echonest_api_key;
        url += '&format=json&name='+artist_input;
        url += '&bucket=id:songkick';
        url += '&results=10';

    var artists = [];
    request.get({url: url, json: true}, function(error, resp, data) {
        data.response.artists.forEach(function (artist, i) {
            if (artist.foreign_ids !== undefined &&
                artist.foreign_ids[0].catalog == 'songkick') {
                var a = {};
                a.name = artist.name;
                a.echo_nest_id = artist.id;
                a.songkick_id = artist.foreign_ids[0].foreign_id.split(/[: ]/).pop();
                artists.push(a);
            }
        });
        
        cb(JSON.stringify(artists));
    });
};

APIEchoNest.artist_songkick_id_search = function (songkick_id, cb) {
    var url = 'http://developer.echonest.com/api/v4/artist/profile?';
        url += 'api_key='+secret.echonest_api_key;
        url += '&id=songkick:artist:'+songkick_id;
        url += '&format=json';
        url += '&bucket=id:songkick';

    var artists = [];
    var artist;
    request.get({url: url, json: true}, function(error, resp, data) {
        artist = data.response.artist;
        if (artist.foreign_ids !== undefined &&
            artist.foreign_ids[0].catalog == 'songkick') {
            var a = {};
            a.name = artist.name;
            a.echo_nest_id = artist.id;
            a.songkick_id = artist.foreign_ids[0].foreign_id.split(/[: ]/).pop();
            artists.push(a);
        }
        
        cb(JSON.stringify(artists));
    });
};


APIEchoNest.hottt = function (cb) {
    var url = 'http://developer.echonest.com/api/v4/artist/top_hottt?';
        url += 'api_key='+secret.echonest_api_key;
        url += '&format=json';
        url += '&bucket=id:songkick';
        url += '&results=100';

    var artists = [];
    request.get({url: url, json: true}, function(error, resp, data) {
        data.response.artists.forEach(function (artist, i) {
            if (artist.foreign_ids !== undefined &&
                artist.foreign_ids[0].catalog == 'songkick') {
                var a = {};
                a.name = artist.name;
                a.echo_nest_id = artist.id;
                a.songkick_id = artist.foreign_ids[0].foreign_id.split(/[: ]/).pop();
                artists.push(a);
            }
        });
        
        cb(JSON.stringify(artists));
    });
};
