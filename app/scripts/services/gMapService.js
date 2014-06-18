'use strict';

angular.module('mdToolApp')
  .factory('gMapService', function () {

    var
      mapConfig = {

        center: {
          latitude: 0,
          longitude: 0
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
            },
            zIndex: 10000
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
            },
            zIndex: 10000
          },
          blue: {
            draggable: true,
            icon: {
              anchor: new google.maps.Point(16, 32),
              url: 'images/marker-pin-blue.png'
            },
            zIndex: 10000
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
            color: '#169413'
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
        },

        pointMarkerWindow: {
          pixelOffset: new google.maps.Size(0, -32)
        }

      };


    function getMapConfig() {
      return mapConfig;
    }

    function setMapCenter(lat, lng) {
      mapConfig.center.latitude = lat;
      mapConfig.center.longitude = lng;
    }

    function getMapZoomLevel() {
      return mapConfig.zoom;
    }

    function setMapZoomLevel (zoomLevel) {
      mapConfig.zoom = zoomLevel;
    }


    // Public API here
    return {
      getMapConfig: getMapConfig,
      getMapZoomLevel: getMapZoomLevel,
      setMapCenter: setMapCenter,
      setMapZoomLevel: setMapZoomLevel
    };


  });
