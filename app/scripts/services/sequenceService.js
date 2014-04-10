'use strict';

angular.module('dmtoolApp')
  .factory('sequenceService', function () {

    var sequences;
   
   function setSequenceProperties (firstEntry) {
      var
        properties = {
        visible: false,
        matchingStatus: (firstEntry.hasCntStop === 'Y') ? 'matched' : 'unmatched',
        departureTime: (firstEntry.tripLabelShort) ? firstEntry.tripLabelShort : new Date(firstEntry.departure).toLocaleTimeString()
      };
      return properties;
    }


    function createSequences(data, splitKey) {
      var
        sequenceData = [],
        sequenceProperties = {},
        splitKeyValue;

      sequences = [];

      for (var i = 0; i < data.length; i++) {
        if (typeof splitKeyValue !== "undefined" && data[i][splitKey] !== splitKeyValue) {
          sequences.push( { properties: sequenceProperties, data: sequenceData} );
          sequenceData = [];
          sequenceProperties = setSequenceProperties(data[i]);
        }
        if (data[i].latitude > 0 && data[i].longitude > 0) {
          sequenceProperties = setSequenceProperties(data[i]);
          sequenceData.push(data[i]);
        }
        splitKeyValue = data[i][splitKey];
      }
      return sequences;
    }

    return {
      createSequences: createSequences
    }

  });
