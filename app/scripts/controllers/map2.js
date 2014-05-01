'use strict';

angular.module('mdToolApp')
  .controller('Map2Ctrl', function ($scope, $routeParams, apiService, sequenceService, gMapService) {

    $scope.mapConfig = gMapService.getMapConfig();
    $scope.rawStopsSequences = [];
    $scope.plannedStopsSequences = [];
    $scope.plannedStopsSequencesOfSelectedBlock = [];

    $scope.submitBlockForm = function () {
      if ($scope.selectedBlock && $scope.selectedBlock.blockKey) {
        getScheduledStopsOfSelectedBlock($scope.selectedBlock.blockKey);
      }
    }

    function setMapCenter(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].latitude > 0 && data[i].longitude > 0) {
          gMapService.setMapCenter(data[i].latitude, data[i].longitude);
          break;
        }
      }
    }

    function setDate(timeString) {
      var dateArray;

      $scope.date = new Date(parseInt(timeString)).toLocaleDateString();
      dateArray = $scope.date.split('.');
      $scope.isoDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
    }

    function findValidTripKey(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].cntTripKey) {
          return data[i].cntTripKey;
        }
      }
    }

    function getScheduledStopsOfMatchedBlock(blockKey) {
      apiService.getScheduleData('stops' + '?operationDay=' + $scope.isoDate + '&blockKey=' + blockKey).then(function (res) {
        console.log("res.scheduleDataOfMatchedBlock", res.data);
        $scope.plannedStopsSequencesOfMatchedBlock = sequenceService.createSequences(res.data, 'tripKey');
      });
    }

    function getMatchedBlockKey(tripKey) {
      apiService.getScheduleData('blockkey' + '?cntTripKey=' + tripKey).then(function (res) {
        console.log("res.blockKey", res.data);
        $scope.matchedBlockKey = res.data;
        getScheduledStopsOfMatchedBlock($scope.matchedBlockKey);
      });
    }

    function getStopsOfSelectedVehicle() {
      apiService.getRawData('stops/' + $routeParams.vehicleId + '/' + $routeParams.startTime + '?dateFrom=' + $routeParams.dateFrom + '&dateTo=' + $routeParams.dateTo).then(function (res) {
        console.log("res.stopstatisticsData", res.data);
        setMapCenter(res.data);
        $scope.matchedBlockKey = getMatchedBlockKey(findValidTripKey(res.data));
        $scope.rawStopsSequences = sequenceService.createSequences(res.data, 'cntTripKey');
      });
    }

    function getBlocksOfDay() {
      apiService.getScheduleData('blocks' + '?operationDay=' + $scope.isoDate).then(function (res) {
        console.log("res.blocksOfDay", res.data);
        $scope.blocksOfDay = res.data;
      });
    }


    function getScheduledStopsOfSelectedBlock(blockKey) {
      apiService.getScheduleData('stops' + '?operationDay=' + $scope.isoDate + '&blockKey=' + blockKey).then(function (res) {
        console.log("res.scheduleDataOfSelectedBlock", res.data);
        $scope.plannedStopsSequencesOfSelectedBlock = sequenceService.createSequences(res.data, 'tripKey');
      });
    }

    setDate($routeParams.startTime);
    getStopsOfSelectedVehicle();
    getBlocksOfDay();


  });
