'use strict';

angular.module('testApp', ['testApp.filters', 'testApp.services', 'testApp.directives']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/p1',
                controller: Page1Ctrl
            }).
            when('/page2/:skid', {
                templateUrl: 'partials/p2',
                controller: Page2Ctrl
            }).
            when('/page3/:id', {
                templateUrl: 'partials/p3',
                controller: Page3Ctrl
            }).
            otherwise({
                redirectTo:  '/'
            });
        $locationProvider.html5Mode(true);
    }]);

