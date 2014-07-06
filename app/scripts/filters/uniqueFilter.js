'use strict';

angular.module('mdToolApp')
  .filter('uniqueFilter', function () {
    return function (input, propertyPath) {
      var
        i, out = [],
        comparisonObj = {};

      input = input || '';

      function getDeepObjectValue(obj, pathString) {
        var i, pathArray = pathString.split('.');
        for (i = 0; i < pathArray.length; i++) {
          obj = obj[pathArray[i]];
        }
        return obj;
      }

      for (i = 0; i < input.length; i++) {
        // if a property path is provided compare values of object property
        var value = propertyPath ? getDeepObjectValue(input[i], propertyPath) : input[i];
        if (!value || typeof value === 'object') {
          continue;
        }
        if (!comparisonObj[value]) {
          out.push(input[i]);
          comparisonObj[value] = true;
        }
      }

      return out;
    };
  });
