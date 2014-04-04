'use strict';

angular.module('dmtoolApp')
  .controller('MainCtrl', function ($scope, $http, apiService) {

    function getRawData() {
      apiService.getRawData('stopstatistics/tripstarttime/', $scope.queryParams).then(function (res) {
        console.log("res.data", res.data);
        $scope.matchingResultData = res.data;
      });
    }



    $scope.queryParams = {
      dateFrom: '2012-01-11',
      dateTo: '2012-02-12'
    };

    $scope.submitRaw = function () {
      getRawData();
    };


    getRawData();

  });
