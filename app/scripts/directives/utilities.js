
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

    .directive('panel', function ($window, $timeout) {
        return {
            restrict: 'EA',
            scope:{
                image: "@",
                size: "@",
                inView: '&',
                attachment:"@",
                position:"@",
                master: '@'
            },
            link: function (scope, element, attrs) {

                scope.position = scope.position ? scope.position : 'center center';
                scope.size = scope.size ? scope.size : 'cover';
                scope.attachment = scope.attachment ? scope.attachment : 'scroll';
                scope.panel = scope.$eval(attrs.panel);
                window.console.log(scope.image);

                attrs.$observe('image', function(newVal){
                    window.console.log(newVal);
                });
                
                if(attrs.color){
                   element.css({'background-color': attrs.color});
                }

                var horizontal = scope.$eval(attrs.horizontal) || false;
                var elem = $(element);
                var elementId = elem.attr('id');
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
                var screenCenter;
                var timer;


                var getPosition = function(){
                    if(horizontal){
//                        window.console.log('im a horizontal element!!!');
                        lastScroll = $($window).scrollLeft();
                        threshold = scope.$eval(attrs.threshold) ? attrs.threshold : ($($window).width() / 2);
                        screenStartEdge = $($window).scrollLeft();  //horizontal position of the scroll bar
                        screenEndEdge = screenStartEdge + $($window).width();
                        screenCenter = $(window).width() / 2;
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

                function isScrolledIntoView(elem){
                    getPosition();
                    startEdgeDiff = elemStartEdge - screenStartEdge;
                    endEdgeDiff = elemStartEdge - screenStartEdge;
                    scrollDirection = (screenStartEdge < lastScroll);
                    lastScroll = screenStartEdge;
                    if(scope.panel < 1){
                        scrollObj = {scrollLeft: elem.offset().left};
                        return((Math.abs(elemStartEdge - screenStartEdge)) < (threshold / 2));
                    }
                    else{
                        return ((Math.abs(elemStartEdge - screenStartEdge)) < threshold);
                    }
                }

                var refresh = function () {
                    var inView = isScrolledIntoView(element);
                    if(inView){
                        $("body").animate(scrollObj, 500, 'swing', function(){
                            clearTimeout(timer);
                            inView = false;
                            return false;
                        });
                    }
                };

                var setImage = function(){
                    if(!scope.image){
                        return null;
                    }
                    element.css({
                        'background-image': 'url(' + scope.image + ')',
                        'background-size': scope.size,
                        'background-position': scope.position,
                        'background-attachment': scope.attachment,
                        'background-repeat': 'no-repeat'
                    });
                };

                var fillScreen = function(){
                    var panel = scope.$eval(attrs.panel);
                    if($(window).width() <= 568 && panel > 1){
                        panel = panel * 2;
                    }

                    var w = $(window).width() * panel;
                    var h = $(window).height();

                    element.css({
                        'min-height': scope.h + 'px',
                        'width': w,
                        'height': h
                    })
                };

                attrs.$observe(attrs.panel, function(newVal){
                    if(newVal){
                        fillScreen();
                    }
                });

                $( window ).bind('resize', function() {
                    getPosition();
                    fillScreen();
                });

                function scroll(scrollObj){
                    $("body").animate(scrollObj, 400, 'swing', function(){
                        window.console.log('scroll call back');
                    });
                }

                getPosition();
                fillScreen();
                setImage();

//                NOTE:
//                this sets up a listener for the window scroll event in order to check if a panel is in isScrolledIntoView

//
//                $(window).bind('scroll',function () {
//                    clearTimeout(timer);
//                    timer = setTimeout( refresh , 800 );
//                });


            }
        }
    })

//    .animate('slide', function(){
//
//        return {
//            enter : function(element, done) {
//                window.console.log('entering');
//
//            },
//
//            leave : function(element, done) {
//                window.console.log('exiting');
//            }
//        };
//
//    })

    .directive("hideIfPhone", ["$window", function($window) {
        return {
            restrict: "A",
            link: function(scope, element, attr) {
                window.console.log(window.innerWidth);
                if(window.innerWidth <= 568) {
                    $(element).hide();
                }
            }
        }
    }])

    .directive("showIfPhone", ["$window", function($window) {
        return {
            restrict: "A",
            link: function(scope, element, attr) {
                if(window.innerWidth <= 568) {
                    $(element).show();
                }
                else{
                    $(element).hide();
                }

            }
        }
    }])

    .directive("scrollTo", ["$window","$location", function($window, $location){
        return {
            restrict : "AC",
            scope:{
                inView: '&',
                toId: '@',
                toPath: '@'
            },
            link: function(scope, element, attr){

                var elementId = attr.scrollTo;
                window.console.log(elementId);
                scope.currentPath = scope.toPath;
                scope.currentId = scope.toId;

                function scroll(scrollObj){
                    $("body").animate(scrollObj, 800, 'swing', function(){

                    });
                }

                function scrollInto(elementId) {
                    var horizontal = scope.$eval(attr.horizontal) || false;

                        var el = document.getElementById(elementId);
                        if(horizontal){
                            var scrollObj = {scrollLeft: $(el).offset().left}
                        }
                        else{
                            var scrollObj = {scrollTop: $(el).offset().top}
                        }

                        scroll(scrollObj);
                }

                element.bind("click", function(event){
                    scrollInto(attr.scrollTo);
                    scope.$apply(function(){
                        scope.inView({id: elementId});
                    })
                });
            }
        };
    }])
;


