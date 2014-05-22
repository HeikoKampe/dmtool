'use strict';

angular.module('mdToolApp')
  .factory('sequenceService', function (helperService) {

    function getStopSequenceProperties(firstEntry) {
      var
        properties = {
          visible: false,
          matchingStatus: (firstEntry.hasCntStop === 'Y') ? 'matched' : 'unmatched',
          departureTime: helperService.getTimeFromDateString(firstEntry.departureAsString),
          tripKey: firstEntry.tripKey || firstEntry.cntTripKey,
          tripLabel: firstEntry.tripLabel || firstEntry.sclTripLabel,
          blockLabel: firstEntry.sclBlockLabel || ''
        };
      console.log("matchingStatus", properties.matchingStatus);
      return properties;
    }

    function getLinePointSequenceProperties(firstEntry) {
      var
        properties = {
          visible: false,
          lineKey: firstEntry.lineKey,
          lineLabel: firstEntry.lineLabel,
          lineLabelShort: firstEntry.lineLabelShort
        };
      return properties;
    }

    function createSequences(data, splitKey, getPropertiesFunction) {
      var
        sequences = [],
        sequenceData = [],
        sequenceProperties = {},
        splitKeyValue = -1;

      for (var i = 0; i < data.length; i++) {

        // skip round if coordinates are invalid
        if (data[i].latitude < 1 && data[i].longitude < 1) {
          console.log("error: invalid coordinates");
          continue;
        }

        // if first round (with valid coordinates)
        if (splitKeyValue === -1) {
          sequenceProperties = getPropertiesFunction(data[i]);
        }

        // if first entry of a new sequence
        if (splitKeyValue !== -1 && data[i][splitKey] !== splitKeyValue) {
          // add collected entries to the sequence collection
          sequences.push({ properties: sequenceProperties, data: sequenceData});
          sequenceData = [];
          sequenceProperties = getPropertiesFunction(data[i]);
        }

        sequenceData.push(data[i]);
        splitKeyValue = data[i][splitKey];
      }

      // add last collected sequence to the collection
      sequences.push({ properties: sequenceProperties, data: sequenceData});

      return sequences;
    }

    function createStopSequences (data, splitKey) {
      return createSequences (data, splitKey, getStopSequenceProperties)
    }

    function createLinePointSequences (data, splitKey) {
      return createSequences (data, splitKey, getLinePointSequenceProperties)
    }

    return {
      createStopSequences: createStopSequences,
      createLinePointSequences: createLinePointSequences
    }

  });
