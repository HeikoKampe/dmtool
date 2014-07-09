'use strict';

angular.module('mdToolApp')
  .directive('tripsTableDirective', function () {
    return {
      templateUrl: 'partials/trips-table.html',
      restrict: 'A',
      scope: {
        sequences: '='
      },
      controller: 'tableController'
    };
  });
