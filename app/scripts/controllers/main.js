'use strict';

angular.module('mdToolApp')
  .controller('MainCtrl', function ($scope, $http, apiService) {

    $scope.queryParams = {
      dateFrom: '2014-01-01',
      dateTo: '2014-01-02'
    };

    $scope.selectedTable = 'vehicles';

    $scope.getMatchedDataLines = function () {
      apiService.getMatchedData('lines', $scope.queryParams).then(function (res) {
        console.log("res.data matched", res.data);
        $scope.matchingResultDataLines = res.data;
      });
    };

    $scope.getMatchedDataBlocks = function () {
      apiService.getMatchedData('blocks', $scope.queryParams).then(function (res) {
        console.log("res.data matched", res.data);
        $scope.matchingResultDataBlocks = res.data;
      });
    };

    $scope.getRawData = function () {
      apiService.getRawData('stops/', $scope.queryParams).then(function (res) {
        console.log("res.data", res.data);
        $scope.stopstatisticResultData = res.data;
      });
    };

    $scope.submit = function () {
      $scope.getMatchedDataLines();
      $scope.getMatchedDataBlocks();
      $scope.getRawData();
    };

    $scope.getMatchedDataLines();
    $scope.getMatchedDataBlocks();
    $scope.getRawData();


  });
