'use strict';

angular.module('mdToolApp')
  .factory('messagesService', function () {

    return {
      messages: {
        tooManyResults: 'Too many results. Please zoom in or select a shorter time period',

      }
    };

});
