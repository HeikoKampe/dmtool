'use strict';

angular.module('mdToolApp')
  .directive('accordionHeader', function () {
    var activeClass = 'active';
    return {
      link: function postLink(scope, element, attrs) {
        element.bind('click', function () {
          var accordionItemBody = element.next();
          if (accordionItemBody.hasClass(activeClass)){
            accordionItemBody.removeClass(activeClass);
            element.removeClass(activeClass);
          } else {
            accordionItemBody.addClass(activeClass);
            element.addClass(activeClass);
          }
        });
      }
    };
  });
