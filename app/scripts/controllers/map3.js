'use strict';

angular.module('mdToolApp')
  .controller('Map3Ctrl', function ($scope, $routeParams, $q, apiService, sequenceService, gMapService, messagesService) {

    var
      mapInstance,
      updateTrigger = true;

    $scope.mapConfig = gMapService.getMapConfig();
    $scope.stopVariation = {
      matched: [],
      unmatched: []
    };

    $scope.linePointsSequences = [];

    $scope.maxNumberOfStops = 5000;

    $scope.showMap = false;
    $scope.showMatchedStopVariation = true;
    $scope.showUnmatchedStopVariation = true;
    $scope.spinner = [false];

    $scope.queryParams = {
      dateFrom: $routeParams.dateFrom,
      dateTo: $routeParams.dateTo,
      lat1: 0,
      lon1: 0,
      lat2: 0,
      lon2: 0
    };

    $scope.messages = {
      lengthWarning: '',
      loading: '',
      nStops: ''
    };


    function showMap() {
      $scope.showMap = true;
    }

    function toggleSpinner(spinnerId) {
      $scope.spinner[spinnerId] = !$scope.spinner[spinnerId];
    }

    function getLineByKey(lineCollection, lineKey) {
      var line, i;
      for (i = 0; i < lineCollection.length; i++) {
        if (lineCollection[i].properties.lineKey == lineKey) {
          line = lineCollection[i];
          break;
        }
      }
      return line;
    }

    // get the point in the middle of a line (half the way through)
    function getHalfWayThroughPointOfLine(linePointsSequence) {
      var halfWayThroughPoint;

      halfWayThroughPoint = linePointsSequence[Math.floor(linePointsSequence.length / 2)];

      return {
        lat: halfWayThroughPoint.latitude,
        lng: halfWayThroughPoint.longitude
      }
    }

    function setMapCenter(linePointsSequence) {
      var centerPoint = getHalfWayThroughPointOfLine(linePointsSequence);

      gMapService.setMapCenter(centerPoint.lat, centerPoint.lng);
    }

    function initialLineSelection(linePointsSequences) {
      var selectedLine;

      if ($routeParams.lineKey) {
        selectedLine = getLineByKey(linePointsSequences, $routeParams.lineKey);
        setMapCenter(selectedLine.data);
        selectedLine.properties.visible = true;
      } else {
        // if there was no line selected take the first one
        setMapCenter(linePointsSequences[0].data);
        linePointsSequences[0].properties.visible = true;
      }
    }

    function buildQueryString(queryParams) {
      var queryString = '?';

      angular.forEach(queryParams, function (value, key) {
        queryString = queryString + key + '=' + value + '&';
      });

      return queryString;
    }

    function matchingStatusFilter(data) {
      angular.forEach(data, function (value, key) {
        if (value.hasCntStop === 'Y') {
          $scope.stopVariation.matched.push(value);
        } else {
          $scope.stopVariation.unmatched.push(value);
        }
      });
    }

    function getStopsOfBoundingBox() {
      $scope.stopVariation = {
        matched: [],
        unmatched: []
      };
      toggleSpinner(0);
      apiService.getRawData('stops/scattering' + buildQueryString($scope.queryParams)).then(function (res) {
        toggleSpinner(0);
        $scope.messages.numberOfStops = res.data.length;
        $scope.messages.loading = '';
        $scope.messages.lengthWarning = '';
        if (res.data.length < $scope.maxNumberOfStops) {
          matchingStatusFilter(res.data);
          $scope.messages.lengthWarning = '';
        } else {
          $scope.messages.lengthWarning = messagesService.messages.tooManyResults;
        }
      });
    }

    function updateBounds(map) {
      var
        bounds = map.getBounds(),
        southWest = bounds.getSouthWest(),
        northEast = bounds.getNorthEast();

      $scope.queryParams.lat1 = southWest.lat();
      $scope.queryParams.lon1 = southWest.lng();
      $scope.queryParams.lat2 = northEast.lat();
      $scope.queryParams.lon2 = northEast.lng();
    }

    $scope.mapEvents = {
      dragend: function (map) {
        updateBounds(map);
      },
      zoom_changed: function (map) {
        updateBounds(map);
      },
      tilesloaded: function (map) {
        $scope.$apply(function () {
          mapInstance = map;
          console.log('MAP LOADED');
          updateBounds(map);
          if (updateTrigger) {
            getStopsOfBoundingBox();
            updateTrigger = false;
          }
        });
      }
    };

    function updateAfterZoom () {
      if (gMapService.getMapZoomLevel() < 14) {
        updateTrigger = true;
        gMapService.setMapZoomLevel(14);
      } else {
        getStopsOfBoundingBox();
      }
    }

    $scope.submit = function () {
//      getStopsOfBoundingBox();
      updateAfterZoom();
    };

    function getLinePoints() {
      apiService.getScheduleData('linepoints').then(function (res) {
        $scope.linePointsSequences = sequenceService.createLinePointSequences(res.data, 'lineKey');
        initialLineSelection($scope.linePointsSequences);
        console.log("$scope.linePointsSeq", $scope.linePointsSequences);
        showMap();
      });
    }

    gMapService.setMapZoomLevel(14);
    getLinePoints();

  }
)
;
