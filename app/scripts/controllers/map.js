'use strict';

angular.module('dmtoolApp')
  .controller('MapCtrl', function ($scope, apiService) {

    var queryParams = {
      vehicleCodes: '2806,2827,459019',
      dateFrom: '2012-01-11',
      dateTo: '2012-01-12',
      isStop: true
    };

    apiService.getRawData('vehicletrips', queryParams).then(function (res) {
      console.log("$scope.data", res.data);
      $scope.map.data = res.data;
    });


    $scope.map = {
      center: {
        latitude: 51.00849,
        longitude: 13.85454
      },
      zoom: 12,
      options: {
        scaleControl: true
      },
      data: []
    };

    $scope.redMarker = { icon: '../images/red-dot.png' };
    $scope.blueMarker = { icon: '../images/blue-dot.png' };
    $scope.greenMarker = { icon: '../images/green-dot.png' };


  });
