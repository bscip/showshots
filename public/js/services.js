'use strict';

/* Services */

angular.module('testApp.services',[]).
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
