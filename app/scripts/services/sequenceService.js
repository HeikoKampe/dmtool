'use strict';

angular.module('dmtoolApp')
  .factory('sequenceService', function () {

    var sequences;

    function convertCoordinate(coordinate) {
      return (coordinate / 60).toFixed(10)
    }

    function getSequenceProperties (sequenceData) {
      var
        properties = {
        visible: false,
        status: (sequenceData.hasCntStop === 'Y') ? 'matched' : 'unmatched'
      };
      return properties;
    }

    function addSequence(sequenceData, sequenceProperties) {
      var sequenceObj = {
        properties: sequenceProperties,
        data: sequenceData
      };
      sequences.push(sequenceObj);
    }

    function createSequences(data, splitKey) {
      var
        sequenceData = [],
        sequenceProperties = {},
        splitKeyValue;

      sequences = [];

      for (var i = 0; i < data.length; i++) {
        data[i].longitude = convertCoordinate(data[i].longitude);
        data[i].latitude = convertCoordinate(data[i].latitude);
        if (typeof splitKeyValue !== "undefined" && data[i][splitKey] !== splitKeyValue) {
          addSequence(sequenceData, sequenceProperties);
          sequenceData = [];
          sequenceProperties = {};
        }
        if (data[i].latitude > 0 && data[i].longitude > 0) {
          sequenceProperties = getSequenceProperties(data[i]);
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
