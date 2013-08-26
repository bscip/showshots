var request = require('request');

// Songkick API module
var APISongkick = (function () {
    var API_KEY;

    var APISongkick = function(key) {
        API_KEY = key;
    };

    APISongkick.prototype.constructor = APISongkick;

    APISongkick.prototype.artist_gigography = function (songkick_id, cb) {
        var url = 'http://api.songkick.com/api/3.0/artists/'+songkick_id;
            url += '/gigography.json?apikey='+API_KEY;
            url += '&order=desc&page=1&per_page=50';

        var shows = [];
        console.log("APISongkick:  "+url);
        request.get({url: url, json: true}, function(error, resp, data) {
            if (data.resultsPage.results.event !== undefined) {
                data.resultsPage.results.event.forEach(function (show, i) {
                    shows.push(process_event_data(show, songkick_id));
                });
            }

            cb(JSON.stringify(shows));
        });
    };

    APISongkick.prototype.event_lookup = function (songkick_event_id, cb) {
        var url = 'http://api.songkick.com/api/3.0/events/'+songkick_event_id;
            url += '.json?apikey='+API_KEY;

        var shows = [];
        console.log("APISongkick:  "+url);
        request.get({url: url, json: true}, function(error, resp, data) {
            if (data.resultsPage.results.event !== undefined) {
                shows.push(process_event_data(data.resultsPage.results.event, null));
                cb(JSON.stringify(shows));
            }
        });
    };

    //  private helper function
    function process_event_data(show, skid) {
        var d = new Date(show.start.date);
        var max_time = Math.round(new Date(d.setHours(d.getHours()+12)).getTime()/1000);
        var max_time = Math.round(new Date(d.setHours(d.getHours()+36)).getTime()/1000);
        // if we have more accurate start time
        if (show.start.datetime !== null) {
            d = new Date(show.start.datetime);
            min_time = Math.round(new Date(d.setHours(d.getHours()-4)).getTime()/1000);
            max_time = Math.round(new Date(d.setHours(d.getHours()+8)).getTime()/1000);
        } 

        var performers = '';
        var main_artist = '';
        show.performance.forEach(function(perf,i) {
            if (perf.artist.id == skid) {
                main_artist = perf.artist.displayName;
            }
            performers += perf.artist.displayName;
            if ((i+1) < show.performance.length) {
                performers += ', ';
            }
        });

        var songkick_id = skid;
        // never given artist, assume headliner
        if (!songkick_id) {
            songkick_id = show.performance[0].artist.id;
            main_artist = show.performance[0].artist.displayName;
        }

        var songkick_event_id = show.id;
        var venue_name = show.venue.displayName;
        var metro_name = show.venue.metroArea.displayName;
        var country_name = show.venue.metroArea.country.displayName;
        var show_details = show.displayName;
        var show_url = show.uri;

        return {
            'songkick_id':  songkick_id,
            'songkick_event_id':  songkick_event_id,
            'main_artist': main_artist, 
            'performers':  performers,
            'date':  show.start.date,
            'datetime':  show.start.datetime,
            'min_time':  min_time,
            'max_time':  max_time,
            'venue_name': venue_name,
            'metro_name': metro_name,
            'country_name': country_name,
            'show_details': show_details,
            'url': show_url
        };
    }

    return APISongkick;
}());
module.exports = APISongkick;
