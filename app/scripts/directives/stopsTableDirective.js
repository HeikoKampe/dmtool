'use strict';

angular.module('mdToolApp')
  .directive('stopsTableDirective', function () {

    return {
      templateUrl: 'templates/stops-table.html',
      restrict: 'A',
      scope: {
        sequences: '='
      },
      controller: 'tableController'
    };
  });
