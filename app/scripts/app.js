'use strict';

angular.module('mdToolApp', [
  'ngResource',
  'ngRoute',
  'google-maps'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/map2/:vehicleId/:startTime', {
        templateUrl: 'views/map2.html',
        controller: 'Map2Ctrl'
      })
      .when('/map3', {
        templateUrl: 'views/map3.html',
        controller: 'Map3Ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
