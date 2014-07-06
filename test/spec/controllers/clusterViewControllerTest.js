'use strict';

describe('Controller: clusterViewController', function () {

  var
    controller,
    rootScope,
    scope,
    routeParams = {},
    apiServiceMock,
    gMapServiceMock,
    sequenceServiceMock,
    sequenceFilterMock,
    messageServiceMock,
    helperServiceMock,
    mapMock,
    mapBoundsMock,
    mapBoundsCoordinateMock,
    deferredRawData,
    deferredScheduleData,
    deferredScheduleData2,
    anySequence = [
      {
        properties: 'any-sequence-properties',
        data: 'any-sequence-data'
      }
    ],
    anyLineKey = '123';

  // load the controller's module
  beforeEach(function () {
    module('mdToolApp');
    // mocking global google api referenced by angular-google-maps directive
    window.google = jasmine.createSpy('google');
  });

  // mocking and overwriting dependencies
  beforeEach(function () {
    apiServiceMock = jasmine.createSpyObj('apiServiceMock', ['getRawData', 'getScheduleData', 'putScheduleData']);
    gMapServiceMock = jasmine.createSpyObj('gMapServiceMock', ['getMapConfig', 'setMapCenter', 'setMapZoomLevel']);
    sequenceServiceMock = jasmine.createSpyObj('sequenceServiceMock', ['createStopSequences', 'createLinePointSequences']);
    sequenceFilterMock = jasmine.createSpy('sequenceFilterMock');
    messageServiceMock = jasmine.createSpy('messageServiceMock');
    helperServiceMock = jasmine.createSpyObj('helperServiceMock', ['getHalfWayThroughPointOfLine', 'buildQueryString']);
    mapMock = jasmine.createSpyObj('mapMock', ['getBounds']);
    mapBoundsMock = jasmine.createSpyObj('mapBoundsMock', ['getSouthWest', 'getNorthEast']);

    helperServiceMock.buildQueryString.andReturn('?any-query-string');
    helperServiceMock.getHalfWayThroughPointOfLine.andReturn({lat: 11.11, lng: 22.22});
    mapBoundsCoordinateMock = function () {
      return 99.99;
    };
    mapBoundsMock.getSouthWest.andReturn({lat:mapBoundsCoordinateMock, lng:mapBoundsCoordinateMock});
    mapBoundsMock.getNorthEast.andReturn({lat:mapBoundsCoordinateMock, lng:mapBoundsCoordinateMock});
    mapMock.getBounds.andReturn(mapBoundsMock);

    module(function ($provide, $filterProvider) {
      $provide.value('apiService', apiServiceMock);
      $provide.value('gMapService', gMapServiceMock);
      $provide.value('sequenceService', sequenceServiceMock);
      $provide.value('messageService', messageServiceMock);
      $provide.value('helperService', helperServiceMock);
      $filterProvider.register('sequenceFilter', function () {
        return sequenceFilterMock;
      });
    });
  });

  // Initialize the controller and a mock dependencies
  beforeEach(inject(function (_$controller_, _$rootScope_, _$q_) {

    deferredRawData = _$q_.defer();
    deferredScheduleData = _$q_.defer();
    deferredScheduleData2 = _$q_.defer();

    apiServiceMock.getRawData.andReturn(deferredRawData.promise);
    apiServiceMock.getScheduleData.andReturn(deferredScheduleData.promise);
    apiServiceMock.putScheduleData.andReturn(deferredScheduleData2.promise);

    rootScope = _$rootScope_;
    scope = _$rootScope_.$new();
    controller = _$controller_('clusterViewController', {
      $scope: scope,
      $routeParams: routeParams
    });


  }));


  describe('getLinePoints()', function () {

    it('should call the apiService.getScheduleData() on init to get the line points data', function () {
      expect(apiServiceMock.getScheduleData).toHaveBeenCalledWith('linepoints');
    });

    it('should show the map after the line points data were loaded by setting $scope.showMap to true', function () {
      sequenceServiceMock.createLinePointSequences.andReturn(anySequence);
      expect(scope.showMap).toEqual(false);
      scope.$apply(function () {
        deferredScheduleData.resolve({data: 'any-line-points-data'});
      });
      expect(scope.showMap).toEqual(true);
    });

  });

  describe('processLinePoints()', function () {

    it('should create sequences out of the received line points data from the api and write them to $scope.linePointsSequences', function () {
      sequenceServiceMock.createLinePointSequences.andReturn(anySequence);
      scope.$apply(function () {
        deferredScheduleData.resolve({data: 'any-line-points-data'});
      });
      expect(sequenceServiceMock.createLinePointSequences.mostRecentCall.args[0]).toEqual('any-line-points-data', 'lineKey');
    });

    it('should set the view to it´s initial state by calling setInitialState() the first time line points data were received', function () {
      sequenceServiceMock.createLinePointSequences.andReturn(anySequence);
      expect(scope.initialState).toEqual(true);
      scope.$apply(function () {
        deferredScheduleData.resolve({data: 'any-line-points-data'});
      });
      expect(scope.initialState).toEqual(false);
    });

  });


  describe('setInitialState()', function () {

    it('should set the map zoom level to 14', function () {
      sequenceServiceMock.createLinePointSequences.andReturn(anySequence);
      scope.$apply(function () {
        deferredScheduleData.resolve({data: 'any-line-points-data'});
      });
      expect(gMapServiceMock.setMapZoomLevel).toHaveBeenCalledWith(14);
    });

    it('should show the line points sequence of the line with line key passed in by route parameters', function () {
      sequenceServiceMock.createLinePointSequences.andReturn(anySequence);
      sequenceFilterMock.andReturn(anySequence);
      routeParams.lineKey = anyLineKey;
      scope.$apply(function () {
        deferredScheduleData.resolve({data: 'any-line-points-data'});
      });
      expect(sequenceFilterMock).toHaveBeenCalledWith([ { properties : 'any-sequence-properties', data : 'any-sequence-data' } ], 'properties.lineKey', '123');
      // map should be moved to where the line points are
      expect(helperServiceMock.getHalfWayThroughPointOfLine).toHaveBeenCalledWith('any-sequence-data');
    });

  });

  describe('updateLinePointsCoordinates()', function () {

    it('should call the apiService.putScheduleData() for sending the new line point coordinates to the api when the event "UPDATE_LINEPOINT" is send', function () {
      scope.selectedMarker = {
        pointLabel: 'any-point-label',
        latitudeNew: 'any-new-latitude',
        longitudeNew: 'any-new-longitude'
      };

      rootScope.$broadcast('UPDATE_LINEPOINT');
      expect(apiServiceMock.putScheduleData).toHaveBeenCalledWith('netpoints/update', { pointLabel : 'any-point-label', latitude : 'any-new-latitude', longitude : 'any-new-longitude' });
    });

    it('should reload line points data after line point coordinates where updated', function () {
      scope.selectedMarker = {
        pointLabel: 'any-point-label',
        latitudeNew: 'any-new-latitude',
        longitudeNew: 'any-new-longitude'
      };

      sequenceFilterMock.andReturn(anySequence);

      rootScope.$broadcast('UPDATE_LINEPOINT');

      scope.$apply(function () {
        deferredScheduleData2.resolve({data: 'any-line-points-data'});
      });

      expect(apiServiceMock.getScheduleData.callCount).toEqual(2);
    });

  });

  describe('getStopsOfBoundingBox', function () {
    it('should call apiService.getRawData() with the selected date range and the map bounding box coordinates', function () {
      scope.queryParams = {
        dateFrom: 'any-date-from',
        dateTo: 'any-date-to'
    };
      scope.mapEvents.tilesloaded(mapMock);
      expect(helperServiceMock.buildQueryString).toHaveBeenCalledWith({ dateFrom : 'any-date-from', dateTo : 'any-date-to', lat1 : 99.99, lon1 : 99.99, lat2 : 99.99, lon2 : 99.99 });
      expect(apiServiceMock.getRawData).toHaveBeenCalledWith('stops/scattering?any-query-string');

    });
  });


});
