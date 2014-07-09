// controller for the line point marker windows of the cluster view

'use strict';

angular.module('mdToolApp')
  .controller('linePointMarkerWindow', function ($scope, eventService) {

    $scope.updateLinePointCoordinates = function () {
      eventService.broadcast('UPDATE_LINEPOINT');
    };

  });
