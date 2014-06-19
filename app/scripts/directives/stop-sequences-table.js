'use strict';

angular.module('mdToolApp')
  .directive('stopSequencesTable', function () {

    return {
      templateUrl: 'templates/stop-sequences-table.html',
      restrict: 'A',
      scope: {
        sequences: '='
      },
      controller: 'sequenceTableController'
    };
  });
