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
                a.artist_name = artist.name;
                a.skid = artist.foreign_ids[0].foreign_id.split(/[: ]/).pop();
                artists.push(a);
            }
        });
        
        cb(JSON.stringify(artists));
    });
};
