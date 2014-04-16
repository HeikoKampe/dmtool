'use strict';

angular.module('dmtoolApp')
  .controller('Map3Ctrl', function ($scope, $routeParams, apiService, sequenceService, gMapService) {

    var
      isFirstApiRequest = true;

    $scope.mapConfig = gMapService.getMapConfig();
    $scope.stopVariation = [];

    $scope.queryParams = {
      dateFrom: $routeParams.dateFrom,
      dateTo: $routeParams.dateTo,
      lat1: $routeParams.lat1,
      lon1: $routeParams.lon1,
      lat2: $routeParams.lat2,
      lon2: $routeParams.lon2
    };

    $scope.messages = {
      lengthWarning: '',
      loading: '',
      nStops: ''
    };


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

    function getRawData() {
      $scope.messages.loading = 'getting data ...';
      apiService.getRawData('stops/variation' + buildQueryString($scope.queryParams)).then(function (res) {
        console.log("res.variations", res.data, res.data.length);
        $scope.messages.length = res.data.length;
        $scope.messages.loading = '';
        $scope.lengthWarning = '';
        if (isFirstApiRequest) {
          setMapCenter(res.data);
          isFirstApiRequest = false;
        }
        if (res.data.length <= 3000) {
          $scope.stopVariation = res.data;
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

  })
;
