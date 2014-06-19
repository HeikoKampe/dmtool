'use strict';

angular.module('mdToolApp')
  .controller('clusterViewController', function ($scope, $routeParams, $filter, $log, apiService, sequenceService, gMapService, messagesService, helperService) {

    var
      mapInstance,
      selectedLinesKeys,
      updateTrigger = true,
      initialState = true;

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
    $scope.spinner = [false, false];

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
          updateBounds(map);
          if (updateTrigger) {
            getStopsOfBoundingBox();
            updateTrigger = false;
          }
        });
      }
    };

    $scope.markersEvents = {
      click: function (gMarker, eventName, model) {
        if (model.id) {
          $scope.$apply(function () {
            $scope.selectedMarker = model;
          });
        }
      },
      dragend: function (gMarker, eventName, model) {
        if (model.id) {

          $scope.$apply(function () {
            // save old coordinates if they were not saved before
            if (!model.longitudeOld) {
              model.longitudeOld = model.longitude;
              model.latitudeOld = model.latitude;
            }
            model.longitudeNew = gMarker.position.A;
            model.latitudeNew = gMarker.position.k;
            model.longitude = gMarker.position.A;
            model.latitude = gMarker.position.k;
          });


        }
      }
    };

    $scope.submit = function () {
      updateAfterZoom();
    };

    function getSelectedLines() {
      selectedLinesKeys = $filter('sequenceFilter')($scope.linePointsSequences, 'properties.visible', true, 'properties.lineKey');
    }

    function reselectLines() {
      var
        i, lineSequence;

      for (i = 0; i < selectedLinesKeys.length; i++) {
        lineSequence = $filter('sequenceFilter')($scope.linePointsSequences, 'properties.lineKey', selectedLinesKeys[i])[0];
        lineSequence.properties.visible = true;
      }
    }

    function updateLinePointCoordinates() {
      var pointData = {
        pointLabel: $scope.selectedMarker.pointLabel,
        latitude: $scope.selectedMarker.latitudeNew,
        longitude: $scope.selectedMarker.longitudeNew
      };

      // remember the currently visible (checked) lines
      getSelectedLines();

      if (pointData.pointLabel && pointData.latitude && pointData.longitude) {
        apiService.putScheduleData('netpoints/update', pointData).then(function () {
          getLinePoints();
        });
        getLinePoints();
      } else {
        $log.error("Error at updateLinePointCoordinates(): missing data");
      }

    };

    function resetLinePoint() {

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

    function matchingStatusFilter(data) {
      angular.forEach(data, function (value, key) {
        if (value && value.hasCntStop === 'Y') {
          $scope.stopVariation.matched.push(value);
        } else {
          $scope.stopVariation.unmatched.push(value);
        }
      });
    }

    // This function helps to prevent too many results by zooming in before getting results
    // for the current map bounding box.
    function updateAfterZoom() {
      if (gMapService.getMapZoomLevel() < 14) {
        updateTrigger = true;
        gMapService.setMapZoomLevel(14);
      } else {
        getStopsOfBoundingBox();
      }
    }

    // get all stops for the current map
    function getStopsOfBoundingBox() {
      $scope.stopVariation = {
        matched: [],
        unmatched: []
      };
      toggleSpinner(0);
      apiService.getRawData('stops/scattering' + helperService.buildQueryString($scope.queryParams)).then(function (res) {
        toggleSpinner(0);
        $log.info('stops of bounding box: ', res.data);
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


    function setInitialState(linePointsSequences) {
      var
        selectedLine;

      gMapService.setMapZoomLevel(14);
      // show selected line and adjust map center according to the selected line
      if ($routeParams.lineKey) {
        selectedLine = $filter('sequenceFilter')($scope.linePointsSequences, 'properties.lineKey', $routeParams.lineKey)[0];
        selectedLine.properties.visible = true;
        setMapCenter(selectedLine.data);
      } else {
        // if no line is selected show the first one
        setMapCenter(linePointsSequences[0].data);
        linePointsSequences[0].properties.visible = true;
      }
    }

    function processLinePoints(data) {
      // create line sequences objects out of the line points
      $scope.linePointsSequences = sequenceService.createLinePointSequences(data, 'lineKey');
      $log.info("linePointSequences", $scope.linePointsSequences);
      // if line points are loaded for the first time provide initial settings
      if (initialState) {
        setInitialState($scope.linePointsSequences);
        initialState = false;
      }
      // if line points are reloaded re-establish previous setting
      if (selectedLinesKeys) {
        reselectLines();
      }
    }

    // get all line points from API
    function getLinePoints() {
      toggleSpinner(1);
      $scope.selectedMarker = {};
      apiService.getScheduleData('linepoints').then(function (res) {
        processLinePoints(res.data)
        toggleSpinner(1);
        showMap();
      });
    }

    // event is send by linePointMarkerWindowController
    $scope.$on('UPDATE_LINEPOINT', function () {
      updateLinePointCoordinates();
    });

    getLinePoints();
  }
);
