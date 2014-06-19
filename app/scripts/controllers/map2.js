'use strict';

angular.module('mdToolApp')
  .controller('Map2Ctrl', function (
    $scope,
    $routeParams,
    $filter,
    $log,
    apiService,
    sequenceService,
    gMapService) {

    $scope.mapConfig = gMapService.getMapConfig();
    $scope.rawStopsSequences = [];
    $scope.scheduledStopSequencesOfMatchingBlock = [];
    $scope.scheduledStopSequencesOfSelectedBlock = [];
    $scope.selectedMatchingBlock = null;
    $scope.vehicleId = $routeParams.vehicleId;
    $scope.spinner = [false, false, false];
    $scope.highlightMarker = {
      visible: false,
      latitude: 51.06093000,
      longitude: 13.68995000
    };


    $scope.submitBlockForm = function () {
      toggleSpinner(2);
      getScheduledTripsOfBlock($scope.selectedBlock.blockKey).then(function (res) {
        toggleSpinner(2);
        $log.info("res.getScheduledTripsOfBlock", res.data);
        $scope.scheduledStopSequencesOfSelectedBlock = sequenceService.createStopSequences(res.data, 'tripKey');
      });
    };

    $scope.showSelectedMatchingBlock = function () {
      if ($scope.selectedMatchingBlock && $scope.selectedMatchingBlock.properties.blockKey) {
        toggleSpinner(1);
        getScheduledTripsOfBlock($scope.selectedMatchingBlock.properties.blockKey).then(function (res) {
          toggleSpinner(1);
          $log.info("res.showSelectedMatchingBlock", res.data);
          $scope.scheduledStopSequencesOfMatchingBlock = sequenceService.createStopSequences(res.data, 'tripKey');
        });
      }
    };

    function highlightMarker (coordinates) {
      $scope.highlightMarker.latitude = coordinates.latitude;
      $scope.highlightMarker.longitude = coordinates.longitude;
      $scope.highlightMarker.visible = true;
    };

    function deHighlightMarker () {
      $scope.highlightMarker.visible = true;
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

    function toggleSpinner(spinnerId) {
      $scope.spinner[spinnerId] = !$scope.spinner[spinnerId];
    }


    function getScheduledTripsOfBlock(blockKey) {
      return apiService.getScheduleData('stops' + '?operationDay=' + $scope.isoDate + '&blockKey=' + blockKey);
    }

    function getMatchingBlocksOfSequences(sequences) {
      return $filter('uniqueFilter')(sequences, 'properties.blockLabel');
    }

    function getStopsOfSelectedVehicle() {
      toggleSpinner(0);
      apiService.getRawData('stops/' + $routeParams.vehicleId + '/' + $routeParams.startTime + '?dateFrom=' + $scope.isoDate + '&dateTo=' + $scope.isoDate).then(function (res) {
        $log.info("getStopsOfSelectedVehicle", res.data);
        toggleSpinner(0);
        setMapCenter(res.data);
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

    $scope.$watch("selectedMatchingBlock", function(newValue, oldValue) {
      $scope.showSelectedMatchingBlock();
    });

    $scope.$on('HIGHLIGHT_STOP_MARKER', function (event, data){
      highlightMarker(data)
    });

    $scope.$on('DE_HIGHLIGHT_STOP_MARKER', function (event, data){
      deHighlightMarker()
    });


    setDate($routeParams.startTime);
    getStopsOfSelectedVehicle();
    getBlocksOfDay();


  });
