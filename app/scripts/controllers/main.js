'use strict';

angular.module('dmtoolApp')
  .controller('MainCtrl', function ($scope, $http, apiService) {


      var params = {
        vehicleCodes: '2806,2827,459019',
        dateFrom: '2012-01-11',
        dateTo: '2012-01-12',
        isStop: true
      };

      apiService.getRawData('vehicletrips', params).then(function (res) {
      $scope.data = res.data;
    });



  });
