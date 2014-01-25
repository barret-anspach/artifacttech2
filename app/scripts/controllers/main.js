'use strict';

angular.module('artifactApp')
  .controller('MainCtrl', function ($scope, $location, $window, $anchorScroll) {




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
