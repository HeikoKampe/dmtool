'use strict';

angular.module('dmtoolApp')
  .controller('MapCtrl', function ($scope, apiService, mapConf) {

    function getRawData() {
      console.log("$scope.queryParamsRaw: ", $scope.queryParamsRaw);
      apiService.getRawData('vehicletrips', $scope.queryParamsRaw).then(function (res) {
        console.log("res.data", res.data);
        $scope.rawData = res.data;
      });
    }

    function getScheduleData() {
      console.log("$scope.queryParamsSchedule: ", $scope.queryParamsSchedule);
      apiService.getScheduleData('vehicletrips', $scope.queryParamsSchedule).then(function (res) {
        console.log("res.data", res.data);
        $scope.scheduleData = res.data;
      });
    }

    function getCountData() {
      console.log("$scope.queryParamsCount: ", $scope.queryParamsCount);
      apiService.getScheduleData('vehicletrips', $scope.queryParamsCount).then(function (res) {
        console.log("res.data", res.data);
        $scope.countData = res.data;
      });
    }

    $scope.queryParamsRaw = {
      vehicleCodes: '2806,2827,459019',
      dateFrom: '2012-01-11',
      dateTo: '2012-01-12',
      isStop: true
    };

    $scope.queryParamsSchedule = {
      vehicleCodes: '2806,2827,459019',
      dateFrom: '2012-01-11',
      dateTo: '2012-01-12',
      isStop: true
    };

    $scope.queryParamsCount = {
      vehicleCodes: '2806,2827,459019',
      dateFrom: '2012-01-11',
      dateTo: '2012-01-12',
      isStop: true
    };

    $scope.map = mapConf;

    $scope.rawData = [];
    $scope.scheduleData = [];
    $scope.countData = [];

    $scope.submitRaw = function () {
      getRawData();
    }

    $scope.submitSchedule = function () {
      getRawData();
    }

    $scope.submitCount = function () {
      getCountData();
    }

    getRawData();
    getScheduleData();
    getCountData();



  });
