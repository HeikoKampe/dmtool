'use strict';

angular.module('mdToolApp')
  .directive('tripsTable', function () {
    return {
      templateUrl: 'templates/trips-table.html',
      restrict: 'A',
      scope: {
        sequences: '='
      },
      controller: 'sequenceTableController'
    };
  });
