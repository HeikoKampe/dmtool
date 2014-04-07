'use strict';

angular.module('dmtoolApp')
  .controller('Map2Ctrl', function ($scope, $routeParams, apiService, mapConf, sequenceService) {

    $scope.mapConf = mapConf;
    $scope.sequences = [];

    function setMapCenter(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].latitude > 0 && data[i].longitude > 0) {
          $scope.mapConf.center.latitude = data[i].latitude;
          $scope.mapConf.center.longitude = data[i].longitude;
          break;
        }
      }
    }

    function getRawData() {
      console.log($routeParams);
      apiService.getRawData('stopstatistics/tripstarttime/' + $routeParams.vehicleId + '/' + $routeParams.startTime).then(function (res) {
        console.log("res.data", res.data);
        setMapCenter(res.data);
        $scope.sequences = sequenceService.createSequences(res.data, 'cntTripKey');
      });
    }

    getRawData();

  });
