
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

    .directive('screen', function($window, $timeout, currentId){
        return {
            restrict: 'A',
            link: function(scope, elem, attr){

                scope.dims = {
                    windowHeight: 0,
                    windowWidth: 0,
                    documentHeight: 0,
                    documentWidth: 0,
                    scrollTop: 0,
                    scrollLeft: 0
                };


                var threshold = $(window).height() / 2;

                var getDims = function(){
                    scope.dims.windowHeight = $(window).height();   // returns height of browser viewport
                    scope.dims.documentHeight = $(document).height(); // returns height of HTML document
                    scope.dims.windowWidth = $(window).width();   // returns width of browser viewport
                    scope.dims.documentWidth = $(document).width();
                    scope.dims.scrollTop = $($window).scrollTop();
                    scope.dims.scrollLeft = $($window).scrollLeft();
                    threshold = $(window).height() / 2;
                };

                var breakPoints = [];
                var sections = elem.find('section');

                var getBreakPoints = function(){
                    breakPoints = [];
                    angular.forEach(sections, function (value, index) {
                        var thisSec = $(value);
                        if(index === 0){
                            breakPoints.push({top:0, id:thisSec.attr('id')});
                        }
                        else{
                            var top = breakPoints[index-1].top + scope.dims.windowHeight;
                            breakPoints.push({top: top, id: thisSec.attr('id')});
                        }
                    });
                };


                var currentSection = sections[0];
                var lastScroll = 0;

                var alreadyThere = false;

                function scroll(scrollObj){
                    if(!alreadyThere){
                        window.console.log('scrolling to ' + scrollObj.scrollTop);
                        $("body").animate(scrollObj, 400, 'swing', function(){
                            alreadyThere = true;

                        });
                    }
                }

                var checkScrollTop = function(){
                    angular.forEach(breakPoints, function (value, key) {
                        if(Math.abs(value.top - scope.dims.scrollTop) < (scope.dims.windowHeight / 2)){
                            if((Math.abs(value.top - scope.dims.scrollTop) !== 0)){
                                currentId.setId(value.id);
                                scroll({scrollTop: value.top});
                            }
                        }
                    });
                };


                $(document).ready(function(){
                    var delay = 800;
                    var timeout = null;
                    $(window).bind('scroll',function(){
                        alreadyThere = false;
                        clearTimeout(timeout);
                        timeout = setTimeout(function(){
                            getDims();
                            getBreakPoints();
                            checkScrollTop();
                        },delay);
                    });
                });

                getDims();

            }
        }
    })


    .directive('bounceOn', function(){
        return function(scope, element, attrs){
            var events = scope.$eval(attrs.bounceOn);
            window.console.log(events);

            angular.forEach(events, function (value, key) {
                window.console.log(value);
                element.on(value, function(){
                    $(element).toggleClass('animated bounce');
                    window.console.log('i should be shaking');
                });
            });

            $(document).ready(function(){
                $(element).effect('animated bounce');
            })
        }
    })
    .directive('bounceRightOn', function(){
        return function(scope, element, attrs){
            var events = scope.$eval(attrs.bounceRightOn);
            window.console.log(events);

            angular.forEach(events, function (value, key) {
                element.on(value, function(){
                    $(element).effect('animated bounce-right');
                });
            });

            $(document).ready(function(){
                $(element).effect('animated bounce-right');
            })
        }
    })
    .directive('peepShowOn', function(currentId, $timeout){
        return function(scope, element, attrs){
            
            var mobile = false;
            scope.$watch('currentId.currentId', function(newVal){
                if(newVal === attrs.id && currentId.isMobile){
                    var timer = $timeout(function(){
                        $(element).addClass('animated peep-show')
                        $timeout(function(){
                            $(element).removeClass('animated peep-show');
                        }, 1000)
                    },800);
                }
                else{
                    $(element).removeClass('animated peep-show');
                }
            });

        }
    })


    .directive('panel', function ($window, $timeout) {
        return {
            restrict: 'EA',
            scope:{
                image: "@",
                size: "@",
                attachment:"@",
                position:"@",
                master: '@'
            },
            link: function (scope, element, attrs) {

                scope.position = scope.position ? scope.position : 'center center';
                scope.size = scope.size ? scope.size : 'cover';
                scope.attachment = scope.attachment ? scope.attachment : 'scroll';
                scope.panel = scope.$eval(attrs.panel);

                attrs.$observe('image', function(newVal){
//                    window.console.log(newVal);
                });
                
                if(attrs.color){
                   element.css({'background-color': attrs.color});
                }


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
                    fillScreen();
                });

                function scroll(scrollObj){
                    $("body").animate(scrollObj, 400, 'swing', function(){
//                        window.console.log('scroll call back');
                    });
                }

                fillScreen();
                setImage();

            }
        }
    })


    .directive("hideIfPhone", ["$window", function($window) {
        return {
            restrict: "A",
            link: function(scope, element, attr) {
//                window.console.log(window.innerWidth);
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

    .directive("scrollTo", ["$window","$location","currentId", function($window, $location, currentId){
        return {
            restrict : "AC",
            scope:{
                toPath: '@'
            },
            link: function(scope, element, attr){

                var elementId = attr.scrollTo;
                scope.currentPath = scope.toPath;

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
                    currentId.setId(attr.scrollTo);
                });
            }
        };
    }])
;


