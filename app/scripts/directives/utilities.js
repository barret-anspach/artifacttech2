
angular.module('artifactApp')
    .directive('backgroundImg', function () {
        return function (scope, element, attrs) {
            attrs.$observe('backgroundImg', function(value) {
                if(!attrs.position) {
                    scope.position = 'center center';
                }
                else {
                    scope.position = attrs.position;
                }
                if(!attrs.attachment) {
                    scope.attachment = 'scroll';
                }
                else {
                    scope.attachment = attrs.attachment;
                }
                element.css({
                    'background-image': 'url(' + value + ')',
                    'background-size': attrs.size,
                    'background-position': scope.position,
                    'background-attachment': scope.attachment,
                    'background-repeat': 'no-repeat'
                })
            });

        }
    })


    .directive('background', function ($window) {
        return {
    //            template: '<div></div>',
            restrict: 'A',
            link: function postLink(scope, element, attrs) {

                $( $window ).resize(function() {
                    if(attrs.background == 'h') {
                        scope.h = document.body.clientHeight;
                        element.css({
                            'min-height': scope.h + 'px'
                        })
                    }
                    else if (attrs.background == 'w') {
                        scope.w = document.body.clientWidth;
                        scope.h = document.body.clientHeight;
                        element.css({
                            'width': scope.w,
                            'height': scope.h
                        })
                    }
                });
                attrs.$observe('background', function(value) {
                    if(value == 'h') {
                        scope.h = document.body.clientHeight;
                        element.css({
                            'min-height': scope.h + 'px'
                        })
                    }
                    else if (value == 'w') {
                        scope.w = document.body.clientWidth;
                        scope.h = document.body.clientHeight;
                        element.css({
                            'width': scope.w,
                            'height': scope.h
                        })
                    }
                })
            }
        }
    })

    .directive('scroller', function($window) {
       return {
           restrict: 'A',
           link: function postLink(scope, element, attrs) {
                $($window).on('scroll', function(){
//                    console.log('scrolling');
                })
           }
       };
    })
    .directive('inView', function($window) {
       return {
           restrict: 'A',
           link: function postLink(scope, element, attrs) {

               var windowEl = $($window);

               var isElementInViewPort = function(){
                   return $(element)[0]
               };

                $($window).on('scroll', function(){
                    console.log(isElementInViewPort());
                })
           }
       };
    })

    .animation('.fullpage', function($window){
        return {
            leave: function(element, done){
                element = angular.element(element);
                var wind = angular.element($window);
                w = wind.width();
                TweenMax.fromTo(element, 1, {position:'absolute', width:w, top:element.scrollHeight}, {top: 0, onComplete:done});
            },
            enter: function(element, done){
                element = element[0];
                console.log(element.height);
//                TweenMax.fromTo(element, 1, {position:'absolute', top:0}, {top: 0, onComplete:done});
            }

        }
    })

    .directive('scrollOnClick', function($window) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var idToScroll = attrs.href;
                element.on('click', function() {
                    var $target;
                    element.css({
                        'position':'absolute',
                        'top': '1000'
                    })
                    $(element).animate({
                        top:0
                    }, 1000);
                });
            }
        };
    })

    .directive('horizontalBkgdContainer', function () {
        return {
    //            template: '<div></div>',
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                attrs.$observe('background', function(value) {
                    scope.panelsNo = document.getElementsByClassName('fullpage').length;
                    scope.w = window.innerWidth;
                    scope.h = window.innerHeight;
                    element.css({
                        'height': scope.h + 'px',
                        'width': (scope.w * scope.panelsNo) + 'px'
                    })
                })
            }
        }
});

