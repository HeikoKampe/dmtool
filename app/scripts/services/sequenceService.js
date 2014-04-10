'use strict';

angular.module('dmtoolApp')
  .factory('sequenceService', function () {

    function setSequenceProperties(firstEntry) {
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
        sequences = [],
        sequenceData = [],
        sequenceProperties = {},
        splitKeyValue;

      for (var i = 0; i < data.length; i++) {
        // sequence split condition
        if (typeof splitKeyValue !== "undefined" && data[i][splitKey] !== splitKeyValue) {
          sequences.push({ properties: sequenceProperties, data: sequenceData});
          sequenceData = [];
          sequenceProperties = setSequenceProperties(data[i]);
        }
        // add only stops with valid coordinates to the sequence
        if (data[i].latitude > 0 && data[i].longitude > 0) {
          sequenceProperties = setSequenceProperties(data[i]);
          sequenceData.push(data[i]);
        }
        splitKeyValue = data[i][splitKey];
      }
      // in case there are zero matched sequences, push one single unmatched sequence into sequences array
      if (sequences.length === 0) {
        sequenceProperties = setSequenceProperties(data[0]);
        sequences.push({ properties: sequenceProperties, data: sequenceData});
      }
      return sequences;
    }

    return {
      createSequences: createSequences
    }

  });
