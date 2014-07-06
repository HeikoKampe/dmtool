'use strict';

angular.module('mdToolApp')
  .controller('landingViewController', function ($scope, $http, $log, apiService) {

    $scope.queryParams = {
      dateFrom: '2014-01-01',
      dateTo: '2014-01-02'
    };

    $scope.selectedTable = 'vehicles';

    $scope.getMatchedDataLines = function () {
      apiService.getMatchedData('lines', $scope.queryParams).then(function (res) {
        $log.info('Lines: ', res.data);
        $scope.matchingResultDataLines = res.data;
      });
    };

    $scope.getMatchedDataBlocks = function () {
      apiService.getMatchedData('blocks', $scope.queryParams).then(function (res) {
        $log.info('Blocks: ', res.data);
        $scope.matchingResultDataBlocks = res.data;
      });
    };

    $scope.getRawData = function () {
      apiService.getRawData('stops/', $scope.queryParams).then(function (res) {
        $log.info('Stops: ', res.data);
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
