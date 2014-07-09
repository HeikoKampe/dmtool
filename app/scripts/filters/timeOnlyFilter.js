// extract the time string out of a date-time string (eg. 2014-01-01 06:45:17)

'use strict';

angular.module('mdToolApp')
  .filter('timeOnlyFilter', function () {
    return function (dateString) {
      var
        subStrings = dateString.split(' ');
      // return the last part of the string devided by a space
      return subStrings[subStrings.length - 1];
    };
  });
