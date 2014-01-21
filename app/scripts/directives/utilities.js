
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

    .directive('preventDefault', function() {
        return function(scope, element, attrs) {
            jQuery(element).click(function(event) {
                event.preventDefault();
            });

        }
    })


    .directive("scrollTo", ["$window","$location", function($window, $location){
        return {
            restrict : "AC",
            scope:{
                inView: '&'
            },
            link: function(scope, element, attr){

                var elementId = attr.scrollTo;
                window.console.log(elementId);
                
                function scroll(scrollObj){
                    $('html, body').animate(scrollObj, 800, 'swing', function(){
//                        window.console.log('scroll call back');
                        scope.$apply(function(){
                            scope.inView({id: elementId});
                        })
                    });
                }
                function scrollInto(elementId) {
                    if(!elementId) $window.scrollTo(0, 0);
                    var horizontal = scope.$eval(attr.horizontal) || false;
                    var home = attr.home ? scope.$eval(attr.home) : true;
                    if(!home){
//                        window.console.log('im not home!!');
                        $location.path('/');
                        var el = document.getElementById(elementId);
                        var scrollObj = {scrollTop: $(el).offset().top};
                        scroll(scrollObj);
                    }
                    else{
                        var el = document.getElementById(elementId);
                        if(horizontal){
                            var scrollObj = {scrollLeft: $(el).offset().left}
                        }
                        else{
                            var scrollObj = {scrollTop: $(el).offset().top}
                        }
                    }

                    if(el) {
                        if(!home){
//                            window.console.log('im not home!!');
                        }
                        else{
                            scroll(scrollObj);
                        }
                    }
                }
                element.bind("click", function(event){
                    scrollInto(attr.scrollTo);
                });
            }
        };
    }])

    .directive('scrollInView',["$window", "$timeout", "$location", function($window, $timeout, $location) {
        return {
            restrict: 'A',
            scope:{
                inView:"&"
            },
            link: function(scope, element, attrs, container) {
                var wind = angular.element($window);
                var horizontal = scope.$eval(attrs.horizontal) || false;
                var scrolling;
                var elem = $(element);
                var lastScroll;
                var threshold;
                var screenStartEdge;
                var screenEndEdge;
                var elemStartEdge;
                var elemEndEdge;
                var startEdgeDiff;
                var endEdgeDiff;
                var scrollDirection;
                var scrollObj;

                var scrollToTop = function(){
                    $('html, body').animate({
                        scrollTop: 0
                    }, 10, 'swing', function(){
                        clearTimeout(timer);
                        return false;
                    });
                };

                var getPosition = function(){
                    if(horizontal){
//                        window.console.log('im a horizontal element!!!');
                        lastScroll = $($window).scrollLeft();
                        threshold = scope.$eval(attrs.threshold) ? attrs.threshold : ($($window).width() / 2);
                        screenStartEdge = $($window).scrollLeft();  //horizontal position of the scroll bar
                        screenEndEdge = screenStartEdge + $($window).width();
                        elemStartEdge = elem.offset().left; //current coordinates of the first element left, top, bottom, right
                        elemEndEdge = elemStartEdge + elem.width(); //computed height of the element
                        scrollObj = {
                            scrollLeft: elemStartEdge
                        }
                    }
                    else{
//                        window.console.log('im a vertical scroll guy');
                        lastScroll = $($window).scrollTop();
                        threshold = scope.$eval(attrs.threshold) ? attrs.threshold : ($($window).height() / 2);
                        screenStartEdge = $($window).scrollTop();  //vertical position of the scroll bar
                        screenEndEdge = screenStartEdge + $($window).height(); //computed height for the first element in the set of matched elements
                        elemStartEdge = elem.offset().top; //current coordinates of the first element left, top, bottom, right
                        elemEndEdge = elemStartEdge + elem.height(); //computed height of the element
                        scrollObj = {
                            scrollTop: elemStartEdge
                        }
                    }
                };

                function isScrolledIntoView(elem)
                {
                    getPosition();
                    startEdgeDiff = elemStartEdge - screenStartEdge;
                    endEdgeDiff = elemStartEdge - screenStartEdge;
                    scrollDirection = (screenStartEdge < lastScroll);
                    lastScroll = screenStartEdge;
                    return ((Math.abs(elemStartEdge - screenStartEdge)) < threshold);
                }

                var timer;

                $(window).bind('scroll',function () {
                    clearTimeout(timer);
                    timer = setTimeout( refresh , 100 );
                });


                var refresh = function () {
                    var inView = isScrolledIntoView(element);
                    if(inView){
                        scope.inView({id: element.attr('id')});
                        $('html, body').animate(scrollObj, 100, 'swing', function(){
                            clearTimeout(timer);
                            return false;
                        });
                    }
                };

                $(document).ready(function(){
                    scrollToTop;
                });

            }
        };
    }])

    .directive('horizontalBkgdContainer', function () {
        return {
    //            template: '<div></div>',
            restrict: 'A',
            controller: function($scope){
                $scope.panels = [];
                this.addPanel = function(panel){
                    $scope.panels.push(panel);
                }
            },
            link: function postLink(scope, element, attrs) {
                attrs.$observe('background', function(value) {
                    scope.panelsNo = document.getElementsByClassName('fullpage horiz').length;
                    scope.w = window.innerWidth;
                    scope.h = window.innerHeight;
                    element.css({
                        'height': scope.h + 'px',
                        'width': (scope.w * scope.panelsNo) + 'px'
                    })
                })
            }
        }
}   )
;


