'use strict';

angular.module('dmtoolApp')
  .controller('MainCtrl', function ($scope, $http, apiService) {

    $scope.queryParams = {
      dateFrom: '2012-01-11',
      dateTo: '2012-02-12'
    };

    $scope.getRawData = function () {
      apiService.getRawData('stopstatistics/tripstarttime/', $scope.queryParams).then(function (res) {
        console.log("res.data", res.data);
        $scope.stopstatisticResultData = res.data;
      });
    };

    $scope.getMatchedData = function () {
      apiService.getMatchedData('', $scope.queryParams).then(function (res) {
        console.log("res.data matched", res.data);
        $scope.matchingResultData = res.data;
      });
    };

    $scope.getMatchedDataBlocks = function () {
      apiService.getMatchedData('blocks', $scope.queryParams).then(function (res) {
        console.log("res.data matched", res.data);
        $scope.matchingResultDataBlocks = res.data;
      });
    };

    $scope.getMatchedDataLines = function () {
      apiService.getMatchedData('lines', $scope.queryParams).then(function (res) {
        console.log("res.data matched", res.data);
        $scope.matchingResultDataLines = res.data;
      });
    };

    $scope.getMatchedDataVehicles = function () {
      apiService.getMatchedData('vehicles', $scope.queryParams).then(function (res) {
        console.log("res.data matched", res.data);
        $scope.matchingResultDataVehicles = res.data;
      });
    };

    $scope.submit = function () {
      $scope.getRawData();
      $scope.getMatchedData();
      $scope.getMatchedDataBlocks();
      $scope.getMatchedDataLines();
      $scope.getMatchedDataVehicles();
    };

    $scope.getRawData();
    $scope.getMatchedData();
    $scope.getMatchedDataBlocks();
    $scope.getMatchedDataLines();
    $scope.getMatchedDataVehicles();

  });
