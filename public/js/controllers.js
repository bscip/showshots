'use strict';

function Page1Ctrl($scope, $http, $location, $routeParams, artistParams) {
    $scope.artist_search = function() {
        $http.post('/api/enas', {'artist_input':$scope.artist_input}).
            success(function(data, status, headers, config) {
                artistParams.setParams(data.artists);
                $scope.artists = data.artists;
                $location.url('/');
            });
    };
}

function Page2Ctrl($scope, $http, $location, $routeParams, $q, showParams, artistParams) {
    var sa = $http.put('/api/saveArtist', {'params':artistParams.getParams($routeParams.id)});
    var sg = $http.post('/api/sg', {'songkick_id':$routeParams.id});
    $q.all([sa, sg]).then(function(comboRes) {
        showParams.setParams(comboRes[1].data.shows);
        $scope.shows = comboRes[1].data.shows;
    });
}

function Page3Ctrl($scope, $http, $routeParams, showParams) {
    $http.post('/api/imgs', {'params':showParams.getParams($routeParams.id)}).
        success(function(data, status, headers, config) {
            $scope.images = data.images;
        });
}
