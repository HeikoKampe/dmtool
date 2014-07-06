'use strict';

describe('Service: sequenceService', function () {


  var
    service,
    rawStopsTestData,
    timeOnlyFilterMock;

  // load the service's module
  beforeEach(function () {
    module('mdToolApp');
    // mocking global google api referenced by angular-google-maps directive
    window.google = jasmine.createSpy('google');
  });

  // mocking and overwriting of injected dependencies
  beforeEach(function () {
    timeOnlyFilterMock = jasmine.createSpy('timeOnlyFilterMock');
    module(function ($filterProvider) {
      $filterProvider.register('timeOnlyFilter', function () {
        return timeOnlyFilterMock;
      });
    });
  });


  // instantiate service and test data
  beforeEach(inject(function (_sequenceService_, _rawStopsTestData_) {
    service = _sequenceService_;
    rawStopsTestData = _rawStopsTestData_;
  }));

  describe('createStopSequences()', function () {

    beforeEach(inject(function () {
      timeOnlyFilterMock.andReturn('10:20:30');
    }));

    it('should return an array of sequence objects each with a "data" and a "properties" property', function () {
      var result = service.createStopSequences(rawStopsTestData.completeSingleEntry, 'cntTripKey');

      expect(result.length > 0).toBe(true);
      expect(result[0].properties).toEqual(jasmine.any(Object));
      expect(result[0].data).toEqual(jasmine.any(Object));
    });

    it('should split the raw-stops input data into various sequence objects according to the passed in splitKey value', function () {
      var result = service.createStopSequences(rawStopsTestData.threeDifferentSplitKeys, 'someSplitKey');

      expect(result.length).toBe(3);
    });

    it('should set the sequence properties of each created sequence object', function () {
      var result = service.createStopSequences(rawStopsTestData.completeSingleEntry, 'cntTripKey');

      expect(result[0].properties.visible).toEqual(false);
      expect(result[0].properties.showStopsInTable).toEqual(false);
      expect(result[0].properties.matchingStatus).toEqual('matched');
      expect(result[0].properties.departureTime).toEqual('10:20:30');
      expect(result[0].properties.tripKey).toEqual(123);
      expect(result[0].properties.tripLabel).toEqual('4_N404-H  04:08');
      expect(result[0].properties.blockLabel).toEqual('Linie 004   Kurs 09');
      expect(result[0].properties.blockKey).toEqual('123');
    });

    it('should ignore invalid coordinates', function () {
      var result = service.createStopSequences(rawStopsTestData.oneValidEntry, 'someSplitKey');

      expect(result.length).toEqual(1);
    });


  });


});
