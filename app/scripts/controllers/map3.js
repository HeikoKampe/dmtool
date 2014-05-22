'use strict';

angular.module('mdToolApp')
  .controller('Map3Ctrl', function ($scope, $routeParams, $q, apiService, sequenceService, gMapService, messagesService, helperService) {

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

    function showMap() {
      $scope.showMap = true;
    }

    function toggleSpinner(spinnerId) {
      $scope.spinner[spinnerId] = !$scope.spinner[spinnerId];
    }

    function setMapCenter(linePointsSequence) {
      var centerPoint = helperService.getHalfWayThroughPointOfLine(linePointsSequence);

      gMapService.setMapCenter(centerPoint.lat, centerPoint.lng);
    }

    function initialLineSelection(linePointsSequences) {
      var selectedLine;

      if ($routeParams.lineKey) {
        selectedLine = helperService.getLineByKey(linePointsSequences, $routeParams.lineKey);
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
        if (value && value.hasCntStop === 'Y') {
          $scope.stopVariation.matched.push(value);
        } else {
          $scope.stopVariation.unmatched.push(value);
        }
      });
    }

    // trigger api call after map has zoomed and new bounding box is evaluated
    function updateAfterZoom() {
      if (gMapService.getMapZoomLevel() < 14) {
        updateTrigger = true;
        gMapService.setMapZoomLevel(14);
      } else {
        getStopsOfBoundingBox();
      }
    }

    $scope.submit = function () {
      updateAfterZoom();
    };

    function getStopsOfBoundingBox() {
      $scope.stopVariation = {
        matched: [],
        unmatched: []
      };
      toggleSpinner(0);
      apiService.getRawData('stops/scattering' + buildQueryString($scope.queryParams)).then(function (res) {
        toggleSpinner(0);
        console.log(res.data);
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

    function updateLinePointPosition (pointData) {
      console.log(test);
      apiService.putScheduleData('netpoints/update', pointData).then(function () {
        console.log("point successful updated");
        getLinePoints();
      });
    };

    function getLinePoints() {
      apiService.getScheduleData('linepoints').then(function (res) {
        $scope.linePointsSequences = sequenceService.createLinePointSequences(res.data, 'lineKey');
        initialLineSelection($scope.linePointsSequences);
        console.log("$scope.linePointsSeq", $scope.linePointsSequences);
        showMap();
      });
    }

    // hack for getting access to the window directive elements (update point button and fields)
    $(document).on('click', '[data-selector="update-point-btn"]', function () {
      var
        pointContainer = $(this).parents('[data-selector="point-container"]'),
        pointData = {
          pointLabel: $('[data-selector="point-label"]', pointContainer).text(),
          latitude: $('[data-selector="lat"]', pointContainer).val(),
          longitude: $('[data-selector="lng"]', pointContainer).val()
        };

      updateLinePointPosition(pointData);
    });

    gMapService.setMapZoomLevel(14);
    getLinePoints();

  }
)
;
