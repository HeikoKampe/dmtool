'use strict';

angular.module('mdToolApp')
  .controller('Map3Ctrl', function ($scope, $routeParams, apiService, sequenceService, gMapService) {

    var
      isFirstApiRequest = true;

    $scope.mapConfig = gMapService.getMapConfig();
    $scope.stopVariation = {
      matched: [],
      unmatched: []
    };
    $scope.showMatchedStopVariation = true;
    $scope.showUnatchedStopVariation = true;

    $scope.queryParams = {
      dateFrom: $routeParams.dateFrom,
      dateTo: $routeParams.dateTo,
      lat1: $routeParams.lat1 || 51.03680215,
      lon1: $routeParams.lon1 || 13.729993571666668,
      lat2: $routeParams.lat2 || 51.04680215,
      lon2: $routeParams.lon2 || 13.739993571666668
    };

    $scope.messages = {
      lengthWarning: '',
      loading: '',
      nStops: ''
    };

    $scope.spinner = [false];

    function toggleSpinner (spinnerId) {
      $scope.spinner[spinnerId] = !$scope.spinner[spinnerId];
    }

    function setMapCenter(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].latitude > 0 && data[i].longitude > 0) {
          gMapService.setMapCenter(data[i].latitude, data[i].longitude);
          break;
        }
      }
    }

    function buildQueryString(queryParams) {
      var queryString = '?';

      angular.forEach(queryParams, function (value, key) {
        queryString = queryString + key + '=' + value + '&';
      });

      return queryString;
    }

    function matchingStatusFilter (data) {
      $scope.stopVariation = {
        matched: [],
        unmatched: []
      };
      angular.forEach(data, function(value, key){
        if (value.hasCntStop=== 'Y') {
          $scope.stopVariation.matched.push(value);
        } else {
          $scope.stopVariation.unmatched.push(value);
        }
      });
    }

    function getRawData() {
      toggleSpinner(0);
      apiService.getRawData('stops/scattering' + buildQueryString($scope.queryParams)).then(function (res) {
        toggleSpinner(0);
        $scope.messages.length = res.data.length;
        $scope.messages.loading = '';
        $scope.lengthWarning = '';
        if (isFirstApiRequest) {
          setMapCenter(res.data);
          isFirstApiRequest = false;
        }
        if (res.data.length <= 3000) {
          matchingStatusFilter(res.data);
          $scope.lengthWarning = '';
        } else {
          $scope.messages.lengthWarning = 'Too many results (' + res.data.length + ')!  Please zoom in.';
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
      }
    };

    $scope.submit = function () {
      getRawData();
    };

    getRawData();

  });
