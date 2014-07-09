// main controller of the matching view

'use strict';

angular.module('mdToolApp')
  .controller('matchingViewController', function ($scope, $http, $log, apiService, helperService) {
    var twoWeeksAgo = new Date();

    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);

    $scope.queryParams = {
      dateFrom: helperService.yymmddDate(twoWeeksAgo),
      dateTo: helperService.yymmddDate(new Date)
    };

    $scope.selectedTable = 'vehicles';

    $scope.spinner = [false];


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
      toggleSpinner(0);
      apiService.getRawData('stops/', $scope.queryParams).then(function (res) {
        toggleSpinner(0);
        $log.info('Stops: ', res.data);
        $scope.stopstatisticResultData = res.data;
      });
    };

    $scope.submit = function () {
      $scope.getMatchedDataLines();
      $scope.getMatchedDataBlocks();
      $scope.getRawData();
    };

    function toggleSpinner(spinnerId) {
      $scope.spinner[spinnerId] = !$scope.spinner[spinnerId];
    }

    $scope.getMatchedDataLines();
    $scope.getMatchedDataBlocks();
    $scope.getRawData();

  });
