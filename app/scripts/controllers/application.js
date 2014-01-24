'use strict';

angular.module('artifactApp')
    .controller('ApplicationCtrl', function ($scope, $anchorScroll, $location, $window) {

        $scope.$location = $location;
        $scope.currentId = 'home';
        $scope.showAbout = false;

        $scope.isLoaded = false;
        $scope.isHome = true;
        var lastScroll = $window.scrollY;

        $(window).on('scroll', function(){
            var thisScroll = $window.scrollY;
//            window.console.log(thisScroll > lastScroll);
//            window.console.log(lastScroll);
            lastScroll = thisScroll;
            $scope.$apply(function(){
                $scope.isHome = ($window.scrollY < 300);
            });
        });
        
        $scope.contentLoaded = function(){
//            window.console.log('include loaded');
            $scope.isLoaded = true;
        };

        $scope.isInView = function(id){
            $scope.currentId = id;
        };

        $scope.isActiveLink = function(id){
            return (id === $scope.currentId);
        };
        
        $scope.swipeLeft = function(id){
            window.console.log('i done swiped to '+ id);
        };
        
        $scope.navChanged = function(top){
            window.console.log(top);
        }


    });