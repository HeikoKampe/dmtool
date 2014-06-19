'use strict';

angular.module('mdToolApp')
  .controller('tableController', function ($scope, eventService) {

    $scope.toggleSequenceDetails = function (sequenceProperties) {
      sequenceProperties.showStopsInTable = !sequenceProperties.showStopsInTable;
    };

    $scope.onMouseOverStopRow = function (isSequenceVisible, lat, lng) {
      if (isSequenceVisible) {
        eventService.broadcast('HIGHLIGHT_STOP_MARKER', {latitude: lat, longitude: lng});
      }
    };

    $scope.onMouseOutStopRow = function (isSequenceVisible) {
      if (isSequenceVisible) {
        eventService.broadcast('DE_HIGHLIGHT_STOP_MARKER');
      }
    }

  });
