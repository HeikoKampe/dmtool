// directive for presenting sequence data in a tables

'use strict';

angular.module('mdToolApp')
  .directive('stopsTableDirective', function () {

    return {
      templateUrl: 'partials/stops-table.html',
      restrict: 'A',
      scope: {
        sequences: '='
      },
      controller: 'tableController'
    };
  });
