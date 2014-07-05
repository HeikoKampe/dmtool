'use strict';

describe('Controller: Map3Ctrl', function () {

  var
    controller,
    scope,
    apiServiceMock,
    gMapServiceMock,
    uniqueFilterMock,
    sequenceServiceMock,
    deferredRawData,
    deferredScheduleData;

  // load the controller's module
  beforeEach(function () {
    module('mdToolApp');
    // mocking global google api referenced by angular-google-maps directive
    window.google = jasmine.createSpy('google');
  });

  // mocking and overwriting of injected dependencies
  beforeEach(function () {
    apiServiceMock = jasmine.createSpyObj('apiServiceMock', ['getRawData', 'getScheduleData']);
    gMapServiceMock = jasmine.createSpyObj('gMapServiceMock', ['getMapConfig', 'setMapCenter']);
    sequenceServiceMock = jasmine.createSpyObj('sequenceServiceMock', ['createStopSequences', 'createLinePointSequences']);
    uniqueFilterMock = jasmine.createSpy('uniqueFilterMock');

    module(function ($provide, $filterProvider) {
      $provide.value('apiService', apiServiceMock);
      $provide.value('gMapService', gMapServiceMock);
      $provide.value('sequenceService', sequenceServiceMock);
      $filterProvider.register('uniqueFilter', function () {
        return uniqueFilterMock;
      });
    });
  });

  // Initialize the controller and a mock dependencies
  beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {

    deferredRawData = _$q_.defer();
    deferredScheduleData = _$q_.defer();

    apiServiceMock.getRawData.andReturn(deferredRawData.promise);
    apiServiceMock.getScheduleData.andReturn(deferredScheduleData.promise);

    scope = _$rootScope_.$new();
    controller = _$controller_('sequenceViewController', {
      $scope: scope,
      $routeParams: {
        startTime: 1388544730000,
        vehicleId: 123
      }
    });


  }));


  describe('getStopsOfSelectedVehicle()', function () {

    it('should call the apiService.getRawData() with route parameters to get the raw stops for a day and vehicle', function () {
      expect(apiServiceMock.getRawData).toHaveBeenCalledWith('stops/123/1388544730000?dateFrom=2014-01-01&dateTo=2014-01-01');
    });

    it('should create stop sequences out of the api call result when call is resolved', function () {
      // call $apply() to resolve promise
      scope.$apply(function () {
        deferredRawData.resolve({data: 'any-raw-stops-data'});
      });
      expect(sequenceServiceMock.createStopSequences).toHaveBeenCalled();
    });

    it('should write the created stop sequences to scope.rawStopsSequences', function () {
      sequenceServiceMock.createStopSequences.andReturn('any-sequences');
      // call $apply() to resolve promise
      scope.$apply(function () {
        deferredRawData.resolve({data: 'any-raw-stops-data'});
      });
      expect(scope.rawStopsSequences).toEqual('any-sequences');
    });

    it('should filter the sequences for different blocks and write the result to $scope.matchingBlocks', function () {
      sequenceServiceMock.createStopSequences.andReturn('any-sequences');
      uniqueFilterMock.andReturn('any-filter-result');
      // call $apply() to resolve promise
      scope.$apply(function () {
        deferredRawData.resolve({data: 'any-raw-stops-data'});
      });
      expect(scope.matchingBlocks).toEqual('any-filter-result');
    });

    it('should set $scope.selectedMatchingBlock to the first found matching block', function () {
      sequenceServiceMock.createStopSequences.andReturn('any-sequences');
      uniqueFilterMock.andReturn(['block1', 'block2']);
      // call $apply() to resolve promise
      scope.$apply(function () {
        deferredRawData.resolve({data: 'bany-raw-stops-data'});
      });
      expect(scope.selectedMatchingBlock).toEqual('block1');
    });

  });

  describe('getBlocksOfDay()', function () {

    it('should call the apiService.getScheduleData() to get all scheduled blocks the selected day', function () {
      expect(apiServiceMock.getScheduleData).toHaveBeenCalledWith('blocks?operationDay=2014-01-01');
    });

    it('should write the api call result to $scope.blocksOfDay', function () {
      // call $apply() to resolve api call promise
      scope.$apply(function () {
        deferredScheduleData.resolve({data: 'any-schedule-data'});
      });
      expect(scope.blocksOfDay).toEqual('any-schedule-data');
    });

  });

  describe('$scope.submitBlockForm()', function () {
    it('should call the apiService.getScheduleData() to get the scheduled trips of a selected block', function () {
      scope.selectedBlock = {
        blockKey: 123
      };
      scope.submitBlockForm();
      expect(apiServiceMock.getScheduleData.mostRecentCall.args[0]).toEqual('stops?operationDay=2014-01-01&blockKey=123');
    });
  });

  describe('$scope.showSelectedMatchingBlock()', function () {
    it('should call apiService.getScheduleData() to get the scheduled trips of the selected block', function () {
      scope.selectedMatchingBlock = {
        properties: {
          blockKey: 'any-block-key'
        }
      };

      scope.showSelectedMatchingBlock();
      expect(apiServiceMock.getScheduleData.mostRecentCall.args[0]).toEqual('stops?operationDay=2014-01-01&blockKey=any-block-key');
    });

  });


})
;
