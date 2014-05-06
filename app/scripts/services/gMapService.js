'use strict';

angular.module('mdToolApp')
  .factory('gMapService', function () {

    var
      mapConfig = {

        center: {
          latitude: 51.00996573333334,
          longitude: 13.783468888333335
        },

        zoom: 12,

        options: {
          scaleControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
          },
          panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
          }
        },

        roundMarkers: {
          black: {
            icon: {
              anchor: new google.maps.Point(6, 6),
              url: 'images/marker-round-black.png'
            }
          },
          red: {
            icon: {
              anchor: new google.maps.Point(6, 6),
              url: 'images/marker-round-red.png'
            }
          },
          green: {
            icon: {
              anchor: new google.maps.Point(6, 6),
              url: 'images/marker-round-green.png'
            }
          },
          blue: {
            icon: {
              anchor: new google.maps.Point(6, 6),
              url: 'images/marker-round-blue.png'
            }
          },
          orange: {
            icon: {
              anchor: new google.maps.Point(6, 6),
              url: 'images/marker-round-orange.png'
            }
          },
          pink: {
            icon: {
              anchor: new google.maps.Point(6, 6),
              url: 'images/marker-round-pink.png'
            }
          }
        },

        pinMarkers: {
          black: {
            icon: {
              anchor: new google.maps.Point(16, 32),
              url: 'images/marker-pin-black.png'
            }
          },
          blue: {
            icon: {
              anchor: new google.maps.Point(16, 32),
              url: 'images/marker-pin-blue.png'
            }
          }
        },

        lines: {
          black: {
            color: '#000'
          },
          red: {
            color: '#ce322e'
          },
          green: {
            color: '#98ba5c'
          },
          blue: {
            color: '#2a80af'
          },
          orange: {
            color: '#e47614'
          },
          pink: {
            color: '#c33a77'
          }
        }

      };


    function getMapConfig() {
      return mapConfig;
    }

    function setMapCenter(lat, lng) {
      mapConfig.center.latitude = lat;
      mapConfig.center.longitude = lng;
    }


    // Public API here
    return {
      getMapConfig: getMapConfig,
      setMapCenter: setMapCenter
    };


  });
