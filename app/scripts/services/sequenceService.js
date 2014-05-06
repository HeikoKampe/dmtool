'use strict';

angular.module('mdToolApp')
  .factory('sequenceService', function () {

    function formatDateString(dateString) {
      var
        subStrings = dateString.split(" ");
      // return the last part of the string devided by a space
      return subStrings[subStrings.length - 1];
    }

    function setSequenceProperties(firstEntry) {
      var
        properties = {
          visible: false,
          matchingStatus: (firstEntry.hasCntStop === 'Y') ? 'matched' : 'unmatched',
          departureTime: formatDateString(firstEntry.departureAsString),
          tripKey: firstEntry.tripKey || firstEntry.cntTripKey,
          tripLabel: firstEntry.tripLabel || ''
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
        } else {
          console.log("Invalid coordinates found in sequence");
        }

        splitKeyValue = data[i][splitKey];
      }

      // push the last found sequence into the sequence array
      sequences.push({ properties: sequenceProperties, data: sequenceData});

      return sequences;
    }

    function setLinePointSequenceProperties(firstEntry) {
      var
        properties = {
          visible: false,
          lineKey: firstEntry.lineKey,
          lineLabel: firstEntry.lineLabel,
          lineLabelShort: firstEntry.lineLabelShort

        };
      return properties;
    }

    function createLinePointSequences(data, splitKey) {
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
          sequenceProperties = setLinePointSequenceProperties(data[i]);
        }
        sequenceProperties = setLinePointSequenceProperties(data[i]);
        sequenceData.push(data[i]);
        splitKeyValue = data[i][splitKey];
      }
      // push the last found sequence into the sequence array
      sequences.push({ properties: sequenceProperties, data: sequenceData});

      return sequences;
    }

    return {
      createSequences: createSequences,
      createLinePointSequences: createLinePointSequences
    }

  });
