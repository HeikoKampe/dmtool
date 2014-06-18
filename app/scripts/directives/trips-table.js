'use strict';

angular.module('mdToolApp')
  .directive('tripsTable', function () {
    return {
      templateUrl: 'templates/trips-table.html',
      restrict: 'A',
      scope: {
        sequences: '='
      },
      controller: function ($scope, $compile, $http) {
        $scope.toggleSequenceDetails = function (sequenceProperties) {
          sequenceProperties.showStopsInTable = !sequenceProperties.showStopsInTable;
        };
      }
    };
  });
