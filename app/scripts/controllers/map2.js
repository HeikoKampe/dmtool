'use strict';

angular.module('dmtoolApp')
  .controller('Map2Ctrl', function ($scope, $routeParams, apiService, mapConf, sequenceService) {

    $scope.mapConf = mapConf;
    $scope.rawStopsSequences = [];
    $scope.plannedStops = [];
    $scope.plannedStopsSequences = [];

    function setMapCenter(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].latitude > 0 && data[i].longitude > 0) {
          $scope.mapConf.center.latitude = data[i].latitude;
          $scope.mapConf.center.longitude = data[i].longitude;
          break;
        }
      }
    }

    function setDateTime (timeString) {
      $scope.dateTime = new Date(parseInt(timeString)).toLocaleString();
    }

    function getRawData() {
      console.log($routeParams);
      apiService.getRawData('stopstatistics/tripstarttime/' + $routeParams.vehicleId + '/' + $routeParams.startTime).then(function (res) {
        console.log("res.stopstatisticsData", res.data);
        setMapCenter(res.data);
        setDateTime($routeParams.startTime);
        $scope.rawStopsSequences = sequenceService.createSequences(res.data, 'cntTripKey');
      });
    }

    function getScheduleData() {
      console.log($routeParams);
      apiService.getScheduleData('stops/' + $routeParams.vehicleId + '/' + $routeParams.startTime).then(function (res) {
        console.log("res.scheduleData", res.data);
        $scope.plannedStops = res.data;
        $scope.plannedStopsSequences = sequenceService.createSequences(res.data, 'tripKey');
      });
    }

    getRawData();
    getScheduleData();

  });
