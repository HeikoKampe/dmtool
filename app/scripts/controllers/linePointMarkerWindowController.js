'use strict';

angular.module('mdToolApp')
  .controller('linePointMarkerWindow', function ($scope, eventService) {

    $scope.test = 'TEst';

    $scope.updateLinePointCoordinates = function () {
      eventService.broadcast('UPDATE_LINEPOINT');
    };

  });
