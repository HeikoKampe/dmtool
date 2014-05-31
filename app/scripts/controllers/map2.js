'use strict';

angular.module('mdToolApp')
  .controller('Map2Ctrl', function ($scope, $routeParams, $filter, $log,  apiService, sequenceService, gMapService) {

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

    $scope.toggleStopsOfSequence = function (sequenceProperties) {
      sequenceProperties.showStopsInTable = !sequenceProperties.showStopsInTable;
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
      var isoDate = new Date(parseInt(timeString)).toISOString();

        $scope.isoDate = isoDate.split('T')[0];
    }

    // fixme: soon obsolete
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
        $log.info("res.scheduledStopsOfMatchedBlock", res.data);
        toggleSpinner(1);
        $scope.plannedStopsSequencesOfMatchedBlock = sequenceService.createStopSequences(res.data, 'tripKey');
        $scope.matchedBlockLabel = res.data[0].blockLabel;
      });
    }

    // fixme: soon obsolete
    function getMatchedBlockKey(tripKey) {
      toggleSpinner(1);
      apiService.getScheduleData('blockkey' + '?cntTripKey=' + tripKey).then(function (res) {
        $log.info("res.blockKey", res.data);
        $scope.matchedBlockKey = res.data;
        if ($scope.matchedBlockKey) {
          getScheduledStopsOfMatchedBlock($scope.matchedBlockKey);
        }
      });
    }

    function getMatchingBlocksOfSequences (sequences) {
      return $filter('uniqueFilter')(sequences, 'properties.blockLabel');
    }

    function getStopsOfSelectedVehicle() {
      toggleSpinner(0);
      apiService.getRawData('stops/' + $routeParams.vehicleId + '/' + $routeParams.startTime + '?dateFrom=' + $scope.isoDate + '&dateTo=' + $scope.isoDate).then(function (res) {
        $log.info("getStopsOfSelectedVehicle", res.data);
        toggleSpinner(0);
        setMapCenter(res.data);
        // fixme: soon obsolete
        $scope.matchedBlockKey = getMatchedBlockKey(findValidTripKey(res.data));
        $scope.rawStopsSequences = sequenceService.createStopSequences(res.data, 'cntTripKey');
        $scope.matchingBlocks = getMatchingBlocksOfSequences($scope.rawStopsSequences);
        $scope.selectedMatchingBlock = $scope.matchingBlocks[0];
        $log.info("$scope.matchingBlocks", $scope.matchingBlocks);
      });
    }

    function getBlocksOfDay() {
      toggleSpinner(2);
      apiService.getScheduleData('blocks' + '?operationDay=' + $scope.isoDate).then(function (res) {
        $log.info("res.blocksOfDay", res.data);
        toggleSpinner(2);
        $scope.blocksOfDay = res.data;
      });
    }

    function getScheduledStopsOfSelectedBlock(blockKey) {
      toggleSpinner(2);
      apiService.getScheduleData('stops' + '?operationDay=' + $scope.isoDate + '&blockKey=' + blockKey).then(function (res) {
        $log.info("res.scheduleDataOfSelectedBlock", res.data);
        toggleSpinner(2);
        $scope.plannedStopsSequencesOfSelectedBlock = sequenceService.createStopSequences(res.data, 'tripKey');
      });
    }

    setDate($routeParams.startTime);
    getStopsOfSelectedVehicle();
    getBlocksOfDay();


  });
