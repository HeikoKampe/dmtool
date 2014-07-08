'use strict';

describe('Controller: matchingViewController', function () {

  // load the controller's module
  beforeEach(module('mdToolApp'));

  var
    controller,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$rootScope_) {
    scope = _$rootScope_.$new();
    controller = _$controller_('matchingViewController', {
      $scope: scope
    });
  }));

  // fixme: write test for the various api calls
  it('should ...', function () {

  });
});
