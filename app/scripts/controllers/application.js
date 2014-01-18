'use strict';

angular.module('artifactApp')
    .controller('ApplicationCtrl', function ($scope, $anchorScroll, $location) {

        $scope.$location = $location;

        $scope.scrollTo = function (id) {
            $location.hash(id);
            $anchorScroll();
        };
    });