'use strict';

angular.module('dmtoolApp', [
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
      .otherwise({
        redirectTo: '/'
      });
  });
