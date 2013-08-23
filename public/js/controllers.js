'use strict';

function Page1Ctrl($scope, $http, $location, $routeParams) {
    var searched_artists = [];

    $http.get('/api/samples', {}).
        success(function(data, status, headrs, config) {
            $scope.prev_artists = data.samples;
        });

    $http.get('/api/hottt', {}).
        success(function(data, status, headrs, config) {
            $scope.hottt_artists = data.artists;
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

function Page2Ctrl($scope, $http, $location, $routeParams, $resource) {
    var found_shows = [];
    var PreSearch = $resource('/api/imgs/:id', {id:'@id'}, {preFetchImages:{method:'POST'}});

    $http.post('/api/sg/'+$routeParams.id, {'songkick_id':$routeParams.id}).
        success(function(data, status, headers, config) {
            $scope.shows = data.shows;
            $scope.shows.forEach(function(show,i) {
                show.images_pre_fetched = false;
                show.images_found = false;
                show.num_images = 0;
                found_shows[show.songkick_event_id] = show;
            });
            data.shows.forEach(function(show,i) {
                PreSearch.preFetchImages({id:show.songkick_event_id}, {params:show}, function(data, status, headers, config) {
                    found_shows[show.songkick_event_id].images_pre_fetched = true;
                    found_shows[show.songkick_event_id].num_images = data.images.length;
                    if (data.images.length > 0) {
                        found_shows[show.songkick_event_id].images_found = true;
                    }
                });
            });
        });

    $scope.show_select = function(show_selected) {
        $http.put('/api/saveShow', {'params':found_shows[show_selected]}).
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
