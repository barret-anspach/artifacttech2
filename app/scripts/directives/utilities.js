
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
        return function(scope, element, attrs) {
//            angular.element($window).bind("scroll", function() {
//                if (this.pageYOffset >= 100) {
////                    element.addClass('min');
//                    console.log('Scrolled below header.');
//                } else {
////                    element.removeClass('min');
//                    console.log('Header is in view.');
//                }
//            });
        };
    })
    .directive('inView', function($window) {
       return {
           restrict: 'A',
           link: function postLink(scope, element, attrs) {

//               var windowEl = $($window);
//
//               var isElementInViewPort = function(){
//                   return $(element)[0]
//               };
//
//                $($window).on('scroll', function(){
////                    console.log(isElementInViewPort());
//                })
           }
       };
    })

    .directive('preventDefault', function() {
        return function(scope, element, attrs) {
            jQuery(element).click(function(event) {
                event.preventDefault();
            });
        }
    })

    .directive('offsetTop', function($timeout, $window){
        return {
            restrict: 'A',
            link: function(scope, elem, attr) {
                var offset = parseInt(attr.offsetTop, 10);
                if(!offset) offset = 10;
                scope.checked = null;
                console.log("offset:  " + offset);
                var windowEl = angular.element($window);
                var handler = function() {
                    scope.scroll = windowEl.scrollTop();
                    clearTimeout($.data(this, 'scrollTimer'));
                    $.data(this, 'scrollTimer', setTimeout(function() {
                        // do something
                        console.log("Haven't scrolled in 250ms!");
                    }, 250));
                };
                windowEl.on('scroll', scope.$apply.bind(scope, handler));
                handler();

            }
        }
    })

    .directive("scrollTo", ["$window", function($window, $location){
        return {
            restrict : "AC",
            scope:{
                inView: '&'
            },
            link: function(scope, element, attr){
                function scrollInto(elementId) {
                    if(!elementId) $window.scrollTo(0, 0);
                    var el = document.getElementById(elementId);
//                    TODO: if the current path is not '/' we need to navigate there before scrolling
//                    More specifically, there needs to be another directive to scroll to a horizontal page
//                    if($location.path() === '/'){
//                        $location.path('/');
//                    }
                    if(attr.horizontal){ var scrollObj = {scrollLeft: $(el).offset().left}}
                    else{ var scrollObj = {scrollTop: $(el).offset().top}}
                    window.console.log(scrollObj);
                    //check if an element can be found with id attribute
                    if(el) {
                        $('html, body').animate(scrollObj, 800, 'swing', function(){
                            window.console.log('scroll call back');
                            scope.$apply(function(){
                                scope.inView({id: elementId});
                            })
                        });
                    }
                }
                element.bind("click", function(event){
                    window.console.log(attr.scrollTo);
                    scrollInto(attr.scrollTo);
                });
            }
//            compile : function(scope, elem, attr){
//                function scrollInto(elementId) {
//                    if(!elementId) $window.scrollTo(0, 0);
//                    var el = document.getElementById(elementId);
//
//                    if(attr.horizontal){ var scrollObj = {scrollLeft: $(el).offset().left}}
//                    else{ var scrollObj = {scrollTop: $(el).offset().top}}
//                    window.console.log(scrollObj);
//                    //check if an element can be found with id attribute
//                    if(el) {
//                        $('html, body').animate(scrollObj, 800, 'swing', function(){
//                            scope.inView({id: elementId});
//                        });
//                    }
//                }
//                return function(scope, element, attr) {
//                    element.bind("click", function(event){
//                        window.console.log('clicked');
//                        scrollInto(attr.scrollTo);
//                    });
//                };
//            }
        };
    }])

    .directive("scrollyContainer", ["$window", function($window){
        return {
            restrict : "AC",
            controller: function($scope){
                $scope.panels = {};

                this.addPanel = function(panel){
                    $scope.panels[panel.id] = panel;
                    console.log($scope.panels);
                };

            },
            link : function(scope, element, attrs){
                $($window).bind('scroll', function(){

                })
            }
        };
    }])

    .directive('navSpy', function(){
        return{
            restrict: 'A',
//            require: '',
            link: function(scope, element, attrs){
                window.console.log(attrs.navSpy);
            }
        }
    })


//    .animation('.home', function($window, $animate){
//        return {
//            beforeAddClass : function(element, className, done) {
////                window.console.log(className);
////                if(className == 'home') {
////                    $(element).addClass('home');
////                }
////                else {
////                    done();
////                }
//            },
//
//            beforeRemoveClass : function(element, className, done) {
//                window.console.log(className);
////                if(className == 'home') {
////                    $(element).removeClass('home');
////                }
////                else {
////                    done();
////                }
//            }
//
//        }
//    })

        .directive('scrollInView', function($window, $timeout, $location) {
        return {
            restrict: 'A',
            scope:{
                inView:"&"
            },
            link: function(scope, element, attrs, container) {
                var wind = angular.element($window);

                var elem = $(element);
//                var elData = {top: elem.position().top, height: elem.height(), id: elem.attr('id')};
//                container.addPanel(elData);
                var threshold = scope.$eval(attrs.threshold) ? attrs.threshold : ($($window).height() / 2);
                var scrolling;
                var lastTop = $($window).scrollTop();
                var INTERVAL_DELAY = 10;
                var interval,
                    handler,
                    el = element[0],
                    scrollEvent = 'scroll',
                    scrollPosition = {
                        x: 0,
                        y: 0
                    };

                function isScrolledIntoView(elem)
                {
                    var viewTop = $($window).scrollTop();  //vertical position of the scroll bar
                    var viewBottom = viewTop + $($window).height(); //computed height for the first element in the set of matched elements

                    var topElem = elem.offset().top; //current coordinates of the first element left, top, bottom, right
                    var elemBottom = topElem + elem.height(); //computed height of the element

                    var topDistance = topElem - viewTop;
                    var downDistance = topElem - viewBottom;
                    var direction = (viewTop < lastTop);

                    lastTop = viewTop;

                    return ((Math.abs(topElem - viewTop)) < threshold);
                }



                var timer;

                $(window).bind('scroll',function () {
                    clearTimeout(timer);
                    timer = setTimeout( refresh , 150 );
                });


                var refresh = function () {
                    // do stuff
                    var inView = isScrolledIntoView(element);
                    if(inView){
                        scope.inView({id: element.attr('id')});
                        if(attrs.scrollInView === 'lock'){
                            $('html, body').animate({
                                scrollTop: $(element).offset().top
                            }, 100, 'swing', function(){

                            });
                        }
                        else{
                            $('html, body').animate({
                                scrollTop: $(element).offset().top
                            }, 100, 'swing', function(){
                                clearTimeout(timer);
                                return false;
                            });
                        }

                    }
                };


                $(document).ready(function(){
                    $('html, body').animate({
                        scrollTop: 0
                    }, 50, 'swing', function(){
                        clearTimeout(timer);
                        return false;
                    });
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
}   )


