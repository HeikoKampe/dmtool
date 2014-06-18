'use strict';

angular.module('mdToolApp')
  .filter('sequenceFilter', function () {
    return function (input, searchProperty, searchValue, returnProperty) {
      var
        i, out = [];

      input = input || '';

      function getDeepObjectValue(obj, pathString) {
        var i, pathArray = pathString.split('.');
        for (i = 0; i < pathArray.length; i++) {
          obj = obj[pathArray[i]];
        }
        return obj;
      }

      for (i = 0; i < input.length; i++) {
        var
          searchPropertyValue,
          returnPropertyValue;

        // if a property path is provided compare values of object property
        searchPropertyValue = searchProperty ? getDeepObjectValue(input[i], searchProperty) : input[i];
        if (searchPropertyValue != searchValue || typeof searchPropertyValue === 'object') continue;

        returnPropertyValue = returnProperty ? getDeepObjectValue(input[i], returnProperty) : input[i];
        out.push(returnPropertyValue);
      }

      return out;
    };
  });
