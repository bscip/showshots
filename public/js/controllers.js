'use strict';

function Page1Ctrl($scope, $http) {
    $http.get('/api/test').
        success(function(data, status, headers, config) {
            $scope.shows = data.shows;
        });
}

function Page2Ctrl($scope, $http) {
    $http.get('/api/testcount').
        success(function(data, status, headers, config) {
            $scope.testcount = data.testcount;
        });
}
