'use strict';

angular.module('mdToolApp', [
  'ngRoute',
  'google-maps'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/matching-view.html',
        controller: 'matchingViewController'
      })
      .when('/sequence-view/:vehicleId/:startTime', {
        templateUrl: 'views/sequence-view.html',
        controller: 'sequenceViewController'
      })
      .when('/cluster-view', {
        templateUrl: 'views/cluster-view.html',
        controller: 'clusterViewController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
