'use strict';

angular.module('artifactApp')
    .controller('ApplicationCtrl', function ($scope, $anchorScroll, $location, $window) {

        $scope.$location = $location;
        $scope.currentId = 'home';
        $scope.currentPath = $location.url();
        
        $scope.userAgent = navigator.userAgent.toLowerCase();
        window.console.log($scope.userAgent);

        $scope.isMobile = function(){
            var isMobile = false;
            var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
            for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) isMobile = true;
            return isMobile
        };

        $scope.showAbout = false;

        $scope.mobileAbout = [
            {url:'/panels/about-main.html', id: 'about-main', background: '../images/bg/AT_about-us-bg.png'},
            {url:"/panels/greg.html", id: 'greg', background: '../images/bg/AT_team-bg.png'},
            {url:"/panels/brent.html", id: 'brent', background: '../images/bg/AT_team-bg.png'},
            {url:"/panels/sam.html", id: 'sam', background: '../images/bg/AT_team-bg.png'},
            {url:"/panels/ben.html", id: 'ben', background: '../images/bg/AT_team-bg.png'},
            {url:"/panels/matt.html", id: 'matt', background: '../images/bg/AT_team-bg.png'},
            {url:"/panels/john.html", id: 'john', background: '../images/bg/AT_team-bg.png'},
            {url:"/panels/cindi.html", id: 'cindi', background: '../images/bg/AT_team-bg.png'},
            {url:"/panels/seth.html", id: 'seth', background: '../images/bg/AT_team-bg.png'},
            {url:"/panels/adrienne.html", id: 'adrienne', background: '../images/bg/AT_team-bg.png'}
        ];

        $scope.views = {
            about:[
                {url: '/panels/about-main.html', id: 'about-main', background: '../images/bg/AT_about-us-bg.png'},
                {url: '/panels/about-team-1.html', id: 'about-team-1', background: '../images/bg/AT_team-bg.png'},
                {url:'/panels/about-team-2.html', id: 'about-team-2', background: '../images/bg/AT_team-bg.png'},
                {url:'/panels/about-team-3.html', id: 'about-team-3', background: '../images/bg/AT_team-bg.png'},
                {url:'/panels/about-team-4.html', id: 'about-team-4', background: '../images/bg/AT_team-bg.png'},
                {url:'/panels/about-team-5.html', id: 'about-team-5', background: '../images/bg/AT_team-bg.png'}
            ],
            platform:[
                {url: '/panels/platform-main.html', id:'platform-main', background: '../images/bg/AT_platform-bg.png'},
                {url: '/panels/platform-curation.html', id:'platform-curation', background: '../images/bg/AT_platform-bg-2.png'},
                {url: '/panels/platform-creation.html', id:'platform-creation', background: '../images/bg/AT_platform-bg-3.png'},
                {url: '/panels/platform-commerce.html', id:'platform-commerce', background: '../images/bg/AT_platform-bg-4.png'},
                {url: '/panels/platform-analysis.html', id:'platform-analysis', background: '../images/bg/AT_platform-bg-5.png'}

            ],
            work:[
                {url: '/panels/work-main.html', id:'work-main', background: '../images/bg/AT_our-work-bg.png'},
                {url: '/panels/work-fonograf.html', id:'work-fonograf', background: '../images/bg/AT_our-work-bg-2.png'},
                {url: '/panels/work-lens.html', id:'work-lens', background: '../images/bg/AT_our-work-bg-3.png'}
            ]
        };

        $scope.currentViews = {};

        if($scope.isMobile()){
            $scope.views.about = $scope.mobileAbout;
        }
        
        window.console.log($scope.views);

        $scope.resetViews = function(){
            angular.forEach($scope.views, function (value, key) {
                $scope.currentViews[key] = value[0];
            });
            window.console.log($scope.currentViews);
        };

        $scope.currentViewById = function(key, id){
            window.console.log(key);
            window.console.log('current view is: ' + id);
            $scope.currentView = key;
            $scope.currentId = id;
            $scope.currentViews[key] = _.find($scope.views[key], {id: id});
        };

        $scope.nextView = function(key){
            window.console.log(key);
            $scope.currentViews[key] = $scope.views[key][$scope.views[key].indexOf($scope.currentViews[key])+ 1];
            $scope.currentId = $scope.currentViews[key].id;
        };

        $scope.previousView = function(key){
            $scope.currentViews[key] = $scope.views[key][$scope.views[key].indexOf($scope.currentViews[key]) - 1];
            $scope.currentId = $scope.currentViews[key].id;
        };

        $scope.resetViews();


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
            $scope.currentView = id;
            window.console.log('current view is: ' + id);
            $scope.resetViews();
        };

        $scope.isActiveLink = function(path, id){
            if(!$scope.currentViews){
                return null;
            }
            if(_.isUndefined(id)){
                return $scope.currentView === path;
            }

            return ($scope.currentViews[path].id === id);
        };
        
        $scope.swipeLeft = function(id){
            window.console.log('i done swiped to '+ id);
        };
        
        $scope.navChanged = function(top){
            window.console.log(top);
        };


    });