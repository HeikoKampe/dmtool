'use strict';

angular.module('mdToolApp')
  .factory('eventService', function ($rootScope, $log) {

    function broadcast(eventName, eventData) {
//      $log.info('broadcast', eventName, eventData);
      $rootScope.$broadcast(eventName, eventData);
    }

    return {
      broadcast: broadcast
    };

  });
