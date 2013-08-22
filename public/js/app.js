'use strict';

angular.module('showshotsApp', 
    ['showshotsApp.filters', 'showshotsApp.services', 'showshotsApp.directives']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/p1',
                controller: Page1Ctrl
            }).
            when('/shows/:id', {
                templateUrl: 'partials/p2',
                controller: Page2Ctrl
            }).
            when('/images/:id', {
                templateUrl: 'partials/p3',
                controller: Page3Ctrl
            }).
            otherwise({
                redirectTo:  '/'
            });
        $locationProvider.html5Mode(true);
    }]);

