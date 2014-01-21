'use strict';

angular.module('artifactApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'angular-inview'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/platform.creation', {
        templateUrl: 'views/platform.creation.html',
        controller: 'MainCtrl'
      })
      .when('/platform.commerce', {
        templateUrl: 'views/platform.commerce.html',
        controller: 'MainCtrl'
      })
      .when('/platform.analysis', {
        templateUrl: 'views/platform.analysis.html',
        controller: 'MainCtrl'
      })
      .when('/platform.curation', {
        templateUrl: 'views/platform.curation.html',
        controller: 'MainCtrl'
      })
      .when('/platform', {
        templateUrl: 'views/platform.main.html',
        controller: 'MainCtrl'
      })
      .when('/work', {
        templateUrl: 'views/work.html',
        controller: 'MainCtrl'
      })
      .when('/about.main', {
        templateUrl: 'views/about.main.html',
        controller: 'MainCtrl'
      })
      .when('/about.team.2', {
        templateUrl: 'views/about.team.2.html',
        controller: 'MainCtrl'
      })
      .when('/about.team.3.html', {
        templateUrl: 'views/about.team.3.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
