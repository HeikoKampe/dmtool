'use strict';

angular.module('mdToolApp')
  .factory('helperService', function () {


    // get the point in the middle of a line (half the way through)
    function getHalfWayThroughPointOfLine(linePointsSequence) {
      var halfWayThroughPoint;

      halfWayThroughPoint = linePointsSequence[Math.floor(linePointsSequence.length / 2)];

      return {
        lat: halfWayThroughPoint.latitude,
        lng: halfWayThroughPoint.longitude
      }
    }


    // Public API here
    return {
      getHalfWayThroughPointOfLine: getHalfWayThroughPointOfLine,
    };

});
