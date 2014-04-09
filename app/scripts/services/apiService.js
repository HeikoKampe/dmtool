'use strict';

angular.module('dmtoolApp')
  .factory('apiService', function ($http) {

    var
      API_BASE_URL_REMOTE =  'https://demodwm3.dilax.com/davisweb/rest/md/',
      API_BASE_URL_LOCAL =  'http://localhost:8080/dwm-suite/rest/md/',

      apiBaseUrl;


    // switch between different base urls here
    apiBaseUrl = API_BASE_URL_LOCAL;


    function getRawData(resource, paramsObj) {
      return $http.get(apiBaseUrl + 'raw/' + resource, { params: paramsObj });
    }

    function getScheduleData(resource, paramsObj) {
      return $http.get(apiBaseUrl + 'schedule/' + resource, { params: paramsObj });
    }

    function getCountData(resource, paramsObj) {
      return $http.get(apiBaseUrl + 'count/' + resource, { params: paramsObj });
    }

    // Public API here
    return {
      getRawData: getRawData,
      getScheduleData: getScheduleData,
      getCountData: getCountData
    };


});
