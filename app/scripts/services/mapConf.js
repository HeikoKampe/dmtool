'use strict';

angular.module('dmtoolApp')
  .value('mapConf', {

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
    markers: {
      red: { icon: 'images/red-dot.png' },
      blue: { icon: 'images/blue-dot.png' },
      green: { icon: 'images/green-dot.png' },
      pink: { icon: 'images/pink-dot.png' },
      visible: false
    },
    lines: {
      matched: {
        color: '#0000ff'
      },
      unmatched: {
        color: '#ff0000'
      }
    }

  });

