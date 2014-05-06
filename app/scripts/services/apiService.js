'use strict';

angular.module('mdToolApp')
  .factory('apiService', function ($http, $window) {

    var apiBaseUrl;

    function setApiBaseUrl () {
      var
        host = $window.location.host,
        path = $window.location.pathname;

      // if app runs on specific port number use a fixed base path to reach the remote rest api
      if ($window.location.port === "9000") {
        apiBaseUrl =  'https://demodwm3.dilax.com/davisweb/rest/md/';
      } else {
        apiBaseUrl = host + '/' +  path.split('/')[1] + '/rest/md/';
      }
    }

    function getRawData(resource, paramsObj) {
      return $http.get(apiBaseUrl + 'raw/' + resource, { params: paramsObj });
    }

    function getScheduleData(resource, paramsObj) {
      return $http.get(apiBaseUrl + 'schedule/' + resource, { params: paramsObj });
    }

    function getCountData(resource, paramsObj) {
      return $http.get(apiBaseUrl + 'count/' + resource, { params: paramsObj });
    }

    function getMatchedData(resource, paramsObj) {
      return $http.get(apiBaseUrl + 'match/' + resource, { params: paramsObj });
    }

    setApiBaseUrl();

    // Public API here
    return {
      getRawData: getRawData,
      getScheduleData: getScheduleData,
      getCountData: getCountData,
      getMatchedData: getMatchedData
    };

});
