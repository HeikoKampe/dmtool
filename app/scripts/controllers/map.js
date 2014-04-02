'use strict';

angular.module('dmtoolApp')
  .controller('MapCtrl', function ($scope, apiService) {

    function getRawData() {
      console.log("$scope.queryParamsRaw: ", $scope.queryParamsRaw);
      apiService.getRawData('vehicletrips', $scope.queryParamsRaw).then(function (res) {
        console.log("res.data", res.data);
        $scope.map.rawData = res.data;
      });
    }

    function getScheduleData() {
      console.log("$scope.queryParamsSchedule: ", $scope.queryParamsSchedule);
      apiService.getScheduleData('vehicletrips', $scope.queryParamsSchedule).then(function (res) {
        console.log("res.data", res.data);
        $scope.map.scheduleData = res.data;
      });
    }

    function getCountData() {
      console.log("$scope.queryParamsCount: ", $scope.queryParamsCount);
      apiService.getScheduleData('vehicletrips', $scope.queryParamsCount).then(function (res) {
        console.log("res.data", res.data);
        $scope.map.countData = res.data;
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

    $scope.map = {
      center: {
        latitude: 51.00996573333334,
        longitude: 13.783468888333335
      },
      zoom: 12,
      options: {
        scaleControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        panControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      },
      rawData: [],
      scheduleData: [],
      countData: []
    };

    $scope.redMarker = { icon: '../images/red-dot.png' };
    $scope.blueMarker = { icon: '../images/blue-dot.png' };
    $scope.greenMarker = { icon: '../images/green-dot.png' };
    $scope.pinkMarker = { icon: '../images/pink-dot.png' };

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
