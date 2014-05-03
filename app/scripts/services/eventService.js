'use strict';

angular.module('mdToolApp')
  .factory('eventService', function ($rootScope) {

    function broadcast(eventName, eventData) {
      console.log("broadcast", eventName, eventData);
      $rootScope.$broadcast(eventName, eventData);
    }

    return {
      broadcast: broadcast
    };

});
