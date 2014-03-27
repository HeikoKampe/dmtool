'use strict';

angular.module('dmtoolApp')
  .controller('MainCtrl', function ($scope, $http, $routeParams) {

    var
      urlDilax = "https://demodwm3.dilax.com/davisweb/rest/md/raw/vehiclecodes",
      urlTest = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts",
      urlTest2 = "http://www.kondespro.de";

    $http.get(urlDilax).success(function (data) {
      $scope.data1 = data;
    });

    $http.get(urlTest).success(function (data) {
      $scope.data2 = data;
    });


    $http.jsonp( urlDilax + '?callback=JSON_CALLBACK' ).then( function ( response ) {
        $scope.data3 = response.data;
    });

    $http.jsonp( urlTest + '?callback=JSON_CALLBACK' ).then( function ( response ) {
        $scope.data4 = response.data;
    });


  });
