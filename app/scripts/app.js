'use strict';

angular.module('artifactApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  "angular-carousel",
  "ngTouch",
  "angular-gestures", "ui.bootstrap"

])
  .config(function ($routeProvider, $sceProvider) {
    $sceProvider.enabled(false);
    $routeProvider
      .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
      })
      .when('/platform', {
        templateUrl: 'views/platform.html',
        controller: 'MainCtrl'
      })
      .when('/work', {
        templateUrl: 'views/work.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .when('/panel', {
        templateUrl: 'views/panel.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  });