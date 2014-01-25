
angular.module('artifactApp')

    .directive('screen', function($window){
        return {
            restrict: 'A',
            controller: function($scope){
                
                $scope.dims = {
                    windowHeight: 0,
                    windowWidth: 0,
                    documentHeight: 0,
                    documentWidth: 0,
                    scrollTop: 0,
                    scrollLeft: 0
                };

                this.dims = $scope.dims;
                
                this.getSize = function(){

                }
            },
            link: function(scope, elem, attr){

                var getDims = function(){
                    scope.dims.windowHeight = $(window).height();   // returns height of browser viewport
                    scope.dims.documentHeight = $(document).height(); // returns height of HTML document
                    scope.dims.windowWidth = $(window).width();   // returns width of browser viewport
                    scope.dims.documentWidth = $(document).width();
                    scope.dims.scrollTop = $($window).scrollTop(); 
                    scope.dims.scrollLeft = $($window).scrollLeft();
                };



                $(window).bind('scroll resize', function(){
                    getDims();
                });

                getDims();


            }
        }
    })

    .directive('lockScroll', function(){
        return function(scope, elem, attr){

        }
    })

    .directive('atTop', function($timeout, $window){
        return function(scope,elem,attr){

            scope.dims = {};

            var getDims = function(){
                scope.dims.windowHeight = $(window).height();   // returns height of browser viewport
                scope.dims.documentHeight = $(document).height(); // returns height of HTML document
                scope.dims.windowWidth = $(window).width();   // returns width of browser viewport
                scope.dims.documentWidth = $(document).width();
                scope.dims.scrollTop = $($window).scrollTop();
                scope.dims.scrollLeft = $($window).scrollLeft();
            };

            var checkTop = function(){
                getDims();

                window.console.log($(window).scrollTop() - $(elem).offset().top === $(elem).offset().top);
//                window.console.log($(elem).offset().top);
            };

            $(window).on('scroll', function(){
                checkTop();
            })
        }
    })

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

                var scrollToTop = function(){
                    $("body").animate({
                        scrollTop: 0,
                        scrollLeft: 0
                    }, 10, 'swing', function(){
                        clearTimeout(timer);
                        return false;
                    });
//                    scope.inView({id: 'home'});
                };

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

                function isScrolledIntoView(elem)
                {
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

                var timer;


                $(window).bind('scroll',function () {
                    clearTimeout(timer);
                    timer = setTimeout( refresh , 800 );
                });

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

                scope.$on('$includeContentLoaded', function(){
                    window.console.log('view content loaded');
                    setImage();
                });

                var setImage = function(){
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
                    if($(window).width() <= 568){
                        window.console.log('small screen width panel');
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

                $( $window ).resize(function() {
                    fillScreen();
                });

                function scroll(scrollObj){
                    $("body").animate(scrollObj, 400, 'swing', function(){
                        window.console.log('scroll call back');
                    });
                }

                fillScreen();
                getPosition();
                setImage();

            }
        }
    })

    .directive('panelContainer', function ($window, $location) {
        return {
            restrict: 'EA',
            scope:{
                image: "@",
                size: "@",
                attachment:"@",
                inView: '&',
                position:"@",
                master: '@'
            },
            link: function (scope, element, attrs) {

                var elem = $(element);
                var elementId = elem.attr('id');

                attrs.$observe('image', function(newVal){
                    window.console.log(newVal);
                    if(newVal){
                        setImage(newVal);
                    }
                });

                function lockScroll(){
                    var $html = $('html');
                    var $body = $('body');
                    var initWidth = $body.outerWidth();
                    var initHeight = $body.outerHeight();

                    var scrollPosition = [
                        elem.offset().left,
                        elem.offset().top
                    ];

                    window.console.log(scrollPosition);
                    $html.data('scroll-position', scrollPosition);
                    $html.data('previous-overflow', $html.css('overflow'));
                    $html.css('overflow', 'hidden');

                    $("body").animate({scrollTop: elem.offset().top}, 800, 'swing', function(){

                    });


//                    window.scrollTo(scrollPosition[0], scrollPosition[1]);
//
//                    var marginR = $body.outerWidth()-initWidth;
//                    var marginB = $body.outerHeight()-initHeight;
//                    $body.css({'margin-right': marginR,'margin-bottom': marginB});
                }

                function unlockScroll(){
                    var $html = $('html');
                    var $body = $('body');
                    $html.css('overflow', $html.data('previous-overflow'));
                    var scrollPosition = $html.data('scroll-position');
                    window.scrollTo(scrollPosition[0], scrollPosition[1]);

                    $body.css({'margin-right': 0, 'margin-bottom': 0});
                }

                scope.position = scope.position ? scope.position : 'center center';
                scope.size = scope.size ? scope.size : 'cover';
                scope.attachment = scope.attachment ? scope.attachment : 'scroll';

                var wind = angular.element($window);
                var horizontal = scope.$eval(attrs.horizontal) || false;
                var scrolling;


                attrs.$observe('image', function(newVal){
                    if(newVal){
                        setImage(newVal);
                    }
                    else{

                    }
                });

                var setImage = function(url){
                    element.css({
                        'background-image': 'url(' + url + ')',
                        'background-size': scope.size,
                        'background-position': scope.position,
                        'background-attachment': scope.attachment,
                        'background-repeat': 'no-repeat'
                    });
                };



                var fillScreen = function(){

                    var panel = scope.$eval(attrs.panelContainer);

                    if($(window).width() <= 635){
                        window.console.log('small screen width container');
                        panel = panel * 2;
                    }

                    var w = $(window).width() * panel;
                    var h = $(window).height();

                    element.css({
                        'min-height': scope.h + 'px',
                        'width': w,
                        'height': h
                    });

                    setImage(scope.image);
                };

                attrs.$observe(attrs.panel, function(newVal){
                    if(newVal){
                        fillScreen();
                    }
                });

                $( $window ).resize(function() {
                    fillScreen();
                });

                scope.$on('$viewContentLoaded', function() {
                    window.console.log('route change success');
                    fillScreen();
                });

                fillScreen();

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
    
    .animation('.at-subnav-wrapper', function(){
        return{
            enter: function(){
                window.console.log('entering');
            },
            leave: function(){
                window.console.log('leaving');
            }
        }
    })

//    .animation('.at-navbar-wrapper', function() {
//        return {
//            beforeAddClass : function(element, className, done) {
//                if(className === 'home') {
//                    window.console.log('before add class');
//
//                    $( element ).toggleClass( className, 100 );
//
//                }
//                else {
//                    done();
//                }
//            },
//
//            beforeRemoveClass : function(element, className, done) {
//                window.console.log('before remove class');
//                if(className === 'home') {
//                    $( element ).toggleClass( className, 100 );
//                }
//                else {
//                    done();
//                }
//            }
//         };
//    })



//    .animation('.home', function() {
//        return {
//            addClass : function(element, className, done) {
//                $( element ).addClass( className, 1000 );
//            },
//            removeClass : function(element, className, done) {
//                $( element ).removeClass( className, 1000 );
//            }
//         };
//    })
//
//    .directive('homeNav', function($animate){
//        return function(scope, element, attrs){
//            scope.$eval(attrs.homeNav);
//            scope.$watch(attrs.homeNav, function(newVal){
//                if(newVal){
//                    window.console.log(attrs.homeNav);
//                    $animate.addClass(element, 'home');
//                }
//                else{
//                    $animate.removeClass(element, 'home');
//                }
//            })
//        }
//    })

    .directive("hideIfPhone", ["$window", function($window) {
        return {
            restrict: "A",
            link: function(scope, element, attr) {
                if(window.innerWidth <= 568) {
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


    .directive('hoverClass', function () {
        return {
            restrict: 'A',
            scope: {
                hoverClass: '@'
            },
            link: function (scope, element) {
                element.on('mouseenter', function() {
                    element.addClass(scope.hoverClass);
                });
                element.on('mouseleave', function() {
                    element.removeClass(scope.hoverClass);
                });
            }
        };
    })
;


