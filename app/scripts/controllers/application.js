'use strict';

angular.module('artifactApp')
    .controller('ApplicationCtrl', function ($scope, $anchorScroll, $location, $window) {

        $scope.$location = $location;
        $scope.currentId = 'home';

        $scope.isLoaded = false;

        $(window).on('scroll', function(){
            $scope.$apply(function(){
                $scope.isHome = ($window.scrollY < 50);
            });
            window.console.log($scope.isHome);
        });
        
        $scope.contentLoaded = function(){
            window.console.log('include loaded');
            $scope.isLoaded = true;
        };

        $scope.isInView = function(id){
            $scope.currentId = id;
        };

        $scope.isActiveLink = function(id){
            return (id === $scope.currentId);
        };
    });