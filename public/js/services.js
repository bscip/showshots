'use strict';

/* Services */

angular.module('testApp.services',[]).
    service('artistParams', function() {
        var params = [];

        return {
            setParams: function(artists) {
                artists.forEach(function(artist,i) {
                    params[artist.songkick_id] = artist;
                });
            },
            getParams: function(songkick_id) {
                // if artist search
                if (params.length) {
                    return params[songkick_id];
                }
                else {
                    return {'songkick_id':songkick_id};
                }
            }
        };
    }).
    service('showParams', function() {
        var params = [];

        return {
            setParams: function(shows) {
                shows.forEach(function(show,i) {
                    params[show.songkick_event_id] = show;
                });
            },
            getParams: function(songkick_event_id) {
                return params[songkick_event_id];
            }
        };
    }).
    value('version','0.1');
