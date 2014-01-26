'use strict';

angular.module('artifactApp')
  .controller('MainCtrl', function ($scope, $location, $window, $anchorScroll) {

        $scope.panelInView = function(panelId, $inview, $inviewpart){
            var panelStatus = {id: panelId, inview: $inview, inviewpart: $inviewpart};
            window.console.log(panelStatus);
        }

  });
