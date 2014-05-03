'use strict';

angular.module('mdToolApp')
  .controller('Map2Ctrl', function ($scope, $routeParams, apiService, sequenceService, gMapService, eventService) {

    $scope.mapConfig = gMapService.getMapConfig();
    $scope.rawStopsSequences = [];
    $scope.plannedStopsSequencesOfMatchedBlock = [];
    $scope.plannedStopsSequencesOfSelectedBlock = [];
    $scope.vehicleId = $routeParams.vehicleId;
    $scope.spinner = [false, false, false];

    $scope.submitBlockForm = function () {
      if ($scope.selectedBlock && $scope.selectedBlock.blockKey) {
        getScheduledStopsOfSelectedBlock($scope.selectedBlock.blockKey);
      }
    };


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

    function toggleSpinner (spinnerId) {
      $scope.spinner[spinnerId] = !$scope.spinner[spinnerId];
    }

    function getScheduledStopsOfMatchedBlock(blockKey) {
      apiService.getScheduleData('stops' + '?operationDay=' + $scope.isoDate + '&blockKey=' + blockKey).then(function (res) {
        console.log("res.scheduledStopsOfMatchedBlock", res.data);
        toggleSpinner(1);
        $scope.plannedStopsSequencesOfMatchedBlock = sequenceService.createSequences(res.data, 'tripKey');
        $scope.matchedBlockLabel = res.data[0].blockLabel;
      });
    }

    function getMatchedBlockKey(tripKey) {
      toggleSpinner(1);
      apiService.getScheduleData('blockkey' + '?cntTripKey=' + tripKey).then(function (res) {
        console.log("res.blockKey", res.data);
        $scope.matchedBlockKey = res.data;
        if ($scope.matchedBlockKey) {
          getScheduledStopsOfMatchedBlock($scope.matchedBlockKey);
        }
      });
    }

    function getStopsOfSelectedVehicle() {
      toggleSpinner(0);
      apiService.getRawData('stops/' + $routeParams.vehicleId + '/' + $routeParams.startTime + '?dateFrom=' + $routeParams.dateFrom + '&dateTo=' + $routeParams.dateTo).then(function (res) {
        console.log("res.stopstatisticsData", res.data);
        toggleSpinner(0);
        setMapCenter(res.data);
        $scope.matchedBlockKey = getMatchedBlockKey(findValidTripKey(res.data));
        $scope.rawStopsSequences = sequenceService.createSequences(res.data, 'cntTripKey');
      });
    }

    function getBlocksOfDay() {
      toggleSpinner(2);
      apiService.getScheduleData('blocks' + '?operationDay=' + $scope.isoDate).then(function (res) {
        console.log("res.blocksOfDay", res.data);
        toggleSpinner(2);
        $scope.blocksOfDay = res.data;
      });
    }

    function getScheduledStopsOfSelectedBlock(blockKey) {
      toggleSpinner(2);
      apiService.getScheduleData('stops' + '?operationDay=' + $scope.isoDate + '&blockKey=' + blockKey).then(function (res) {
        console.log("res.scheduleDataOfSelectedBlock", res.data);
        toggleSpinner(2);
        $scope.plannedStopsSequencesOfSelectedBlock = sequenceService.createSequences(res.data, 'tripKey');
      });
    }

    setDate($routeParams.startTime);
    getStopsOfSelectedVehicle();
    getBlocksOfDay();


  });
