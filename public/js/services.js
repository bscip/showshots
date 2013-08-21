'use strict';

/* Services */

angular.module('testApp.services',[]).
    service('artistParams', function() {
        var params = [];

        return {
            setParams: function(artists) {
                console.log('set art params');
                console.log(artists);
                artists.forEach(function(artist,i) {
                    params[artist.songkick_id] = artist;
                });
            },
            getParams: function(songkick_id) {
                console.log('get art params');
                console.log(params[songkick_id]);
                return params[songkick_id];
            }
        };
    }).
    service('showParams', function() {
        var params = [];

        return {
            setParams: function(shows) {
                shows.forEach(function(show,i) {
                    params[show.songkick_show_id] = show;
                });
            },
            getParams: function(songkick_show_id) {
                return params[songkick_show_id];
            }
        };
    }).
    value('version','0.1');
