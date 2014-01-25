'use strict';

angular.module('artifactApp')
  .controller('MainCtrl', function ($scope, $location, $window, $anchorScroll) {


        $('.jcarousel').jcarousel();

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();


//
//        var scroll_snap_t;
//
//        $scope.panelInView = function(thisPanel, inview, inviewpart) {
//            if(!_.isUndefined, thisPanel){
//                $scope.panelId = document.getElementById(thisPanel);
//                $scope.panelHeight = $scope.panelId.offsetHeight || 0;
//                $scope.panelPosTop = $scope.panelId.offsetTop;
//                $scope.panelPosBottom = $scope.panelPosTop + $scope.panelHeight;
//
//                if (typeof(inviewpart) != 'undefined') {
////            console.log(thisPanel + ': ' + inviewpart + ' (offsetTop: ' + $scope.panelPosTop
////                + ', offsetBottom: ' + $scope.panelPosBottom + ')');
//                    $scope.documentPosTop = document.documentElement.scrollTop || document.body.scrollTop;
//
//                    if ((Math.abs($scope.panelPosTop - $scope.documentPosTop)) <= ($scope.panelHeight) /4) {
//                        console.log("scrolling to :" + thisPanel);
//                        $('html, body').animate({
//                            scrollTop: $scope.panelPosTop
//                        }, 200, 'swing', function(){
//                            clearTimeout(scroll_snap_t);
//                            return false;
//                        });
//                    }
//                }
//
//            };
//        };
//
//        $(window).bind('scroll', function(e){
//            clearTimeout(scroll_snap_t);
//            scroll_snap_t = setTimeout($scope.panelInView, 1000);
//        });

  });
