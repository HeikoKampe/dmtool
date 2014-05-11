'use strict';

angular.module('mdToolApp')
  .factory('helperService', function () {


    function getLineByKey(lineCollection, lineKey) {
      var line, i;
      for (i = 0; i < lineCollection.length; i++) {
        if (lineCollection[i].properties.lineKey == lineKey) {
          line = lineCollection[i];
          break;
        }
      }
      return line;
    }

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
      getLineByKey: getLineByKey,
      getHalfWayThroughPointOfLine: getHalfWayThroughPointOfLine
    };

});
