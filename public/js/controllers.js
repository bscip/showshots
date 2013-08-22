'use strict';

function Page1Ctrl($scope, $http, $location, $routeParams) {
    var searched_artists = [];

    $http.put('/api/findArtists', {}).
        success(function(data, status, headrs, config) {
            $scope.prev_artists = data.artists;
        });

    $scope.artist_search = function() {
        $http.post('/api/enas/'+$scope.artist_input, {'artist_input':$scope.artist_input}).
            success(function(data, status, headers, config) {
                data.artists.forEach(function(artist, i) {
                   searched_artists[artist.songkick_id] = artist; 
                });
                $scope.artists = data.artists;
            });
    };

    $scope.artist_select = function(artist_selected) {
        $http.put('/api/saveArtist', {'params':searched_artists[artist_selected]}).
            success(function(data, status, headers, config) {
                $location.url('/shows/'+artist_selected);
            });
    };
}

function Page2Ctrl($scope, $http, $location, $routeParams) {
    var searched_shows = [];

    $http.post('/api/sg/'+$routeParams.id, {'songkick_id':$routeParams.id}).
        success(function(data, status, headers, config) {
            data.shows.forEach(function(show,i) {
                searched_shows[show.songkick_event_id] = show;
            });
            $scope.shows = data.shows;
        });

    $scope.show_select = function(show_selected) {
        $http.put('/api/saveShow', {'params':searched_shows[show_selected]}).
            success(function(data, status, headers, config) {
                $location.url('/images/'+show_selected);
            });
    };
}

function Page3Ctrl($scope, $http, $routeParams, $q) {
    $http.put('/api/findShows', {'params':{'songkick_event_id':$routeParams.id}}).
        success(function(data, status, headers, config) {
            $http.post('/api/imgs/'+$routeParams.id, {'params':data.shows[0]}).
                success(function(data, status, headers, config) {
                    $scope.images = data.images;
                    var imgs = [];
                    $scope.images.forEach(function(img,i) {
                        imgs.push($http.put('/api/saveImage', {'params':img}));
                    });
                    $q.all(imgs).then(function(comboRes) {
                        // do something after saving images?
                    });
            });
        });
}
