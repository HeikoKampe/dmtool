'use strict';

angular.module('mdToolApp')
  .directive('tripsTableDirective', function () {
    return {
      templateUrl: 'templates/trips-table.html',
      restrict: 'A',
      scope: {
        sequences: '='
      },
      controller: 'tableController'
    };
  });
