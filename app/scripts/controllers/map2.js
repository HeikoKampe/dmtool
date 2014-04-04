'use strict';

angular.module('dmtoolApp')
  .controller('Map2Ctrl', function ($scope, $routeParams, apiService, mapConf, sequenceService) {

    $scope.mapConf = mapConf;
    $scope.sequences = [];

    function getRawData() {
      console.log($routeParams);
      apiService.getRawData('stopstatistics/tripstarttime/' + $routeParams.vehicleId + '/' + $routeParams.startTime).then(function (res) {
        console.log("res.data", res.data);
        $scope.sequences = sequenceService.createSequences(res.data, 'cntTripKey');
      });
    }

    getRawData();

  });
