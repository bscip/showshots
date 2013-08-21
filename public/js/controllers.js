'use strict';

function Page1Ctrl($scope, $http, $location, $routeParams) {
    $http.get('/api/test').
        success(function(data, status, headers, config) {
            console.log(data.shows);
            $scope.shows = data.shows;
        });

    $scope.artist_search = function() {
        $http.post('/api/enas', {'artist_input':$scope.artist_input}).
            success(function(data, status, headers, config) {
                $scope.artists = data.artists;
                $location.url('/');
            });
    };
}

function Page2Ctrl($scope, $http, $location, $routeParams, showParams) {
    $http.post('/api/sg', {'skid':$routeParams.skid}).
        success(function(data, status, headers, config) {
            showParams.setParams(data.shows);
            $scope.shows = data.shows;
        });
}

function Page3Ctrl($scope, $http, $routeParams, showParams) {
    $http.post('/api/imgs', {'params':showParams.getParams($routeParams.id)}).
        success(function(data, status, headers, config) {
            $scope.images = data.images;
        });
}
