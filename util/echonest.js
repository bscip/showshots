var request = require('request');

// EchoNest API module
var APIEchoNest = (function () {
    var API_KEY;

    var APIEchoNest = function(key) {
        API_KEY = key;
    };

    APIEchoNest.prototype.constructor = APIEchoNest;

    APIEchoNest.prototype.artist_search = function (artist_input, cb) {
        var url = 'http://developer.echonest.com/api/v4/artist/search?';
            url += 'api_key='+API_KEY;
            url += '&format=json&name='+artist_input;
            url += '&bucket=id:songkick';
            url += '&results=10';

        var artists = [];
        console.log("APIEchonest:  "+url);
        request.get({url: url, json: true}, function(error, resp, data) {
            if (data.response.artists !== undefined) {
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
            }
            
            cb(JSON.stringify(artists));
        });
    };

    APIEchoNest.prototype.artist_songkick_id_search = function (songkick_id, cb) {
        var url = 'http://developer.echonest.com/api/v4/artist/profile?';
            url += 'api_key='+API_KEY;
            url += '&id=songkick:artist:'+songkick_id;
            url += '&format=json';
            url += '&bucket=id:songkick';

        var artists = [];
        var artist;
        console.log("APIEchonest:  "+url);
        request.get({url: url, json: true}, function(error, resp, data) {
            if (data.response.artist !== undefined) {
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
            }
        });
    };

    APIEchoNest.prototype.hottt = function (cb) {
        var url = 'http://developer.echonest.com/api/v4/artist/top_hottt?';
            url += 'api_key='+API_KEY;
            url += '&format=json';
            url += '&bucket=id:songkick';
            url += '&results=100';

        var artists = [];
        console.log("APIEchonest:  "+url);
        request.get({url: url, json: true}, function(error, resp, data) {
            if (data.response.artists !== undefined) {
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
            }
            
            cb(JSON.stringify(artists));
        });
    };

    return APIEchoNest;
}());
module.exports = APIEchoNest;
