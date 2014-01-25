'use strict';

angular.module('artifactApp')
    .controller('ApplicationCtrl', function ($scope, $anchorScroll, $location, $window) {

        $scope.$location = $location;

        $scope.currentId = 'home';
        $scope.currentPath = $location.url();

        $scope.scrollLocked = function(){
            return true;
        };

        $scope.showAbout = false;

        $scope.views = {
            about:[
                {url: '/panels/about-main.html', id: 'about-main'},
                {url: '/panels/about-team-1.html', id: 'about-team-1'},
                {url:'/panels/about-team-2.html', id: 'about-team-2'},
                {url:'/panels/about-team-3.html', id: 'about-team-3'},
                {url:'/panels/about-team-4.html', id: 'about-team-4'},
                {url:'/panels/about-team-5.html', id: 'about-team-5'}
            ],
            platform:[
                {url: '/panels/platform-main.html', id:'platform-main'},
                {url: '/panels/platform-curation.html', id:'platform-curation'},
                {url: '/panels/platform-creation.html', id:'platform-creation'},
                {url: '/panels/platform-commerce.html', id:'platform-commerce'},
                {url: '/panels/platform-analysis.html', id:'platform-analysis'}

            ],
            work:[
                {url: '/panels/work-main.html', id:'work-main'},
                {url: '/panels/work-fonograf.html', id:'work-fonograf'},
                {url: '/panels/work-lens.html', id:'work-lens'}
            ]
        };



        $scope.currentViews = {};

        $scope.resetViews = function(){
            angular.forEach($scope.views, function (value, key) {
                $scope.currentViews[key] = value[0];
            });
            window.console.log($scope.currentViews);
        };

        $scope.currentViewById = function(key, id){
            window.console.log(key);
            $scope.currentViews[key] = _.find($scope.views[key], {id: id});
        };

        $scope.nextView = function(key){
            window.console.log(key);
            $scope.currentViews[key] = $scope.views[key][$scope.views[key].indexOf($scope.currentViews[key])+ 1];
        };

        $scope.previousView = function(key){
            $scope.currentViews[key] = $scope.views[key][$scope.views[key].indexOf($scope.currentViews[key]) - 1];
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

        $scope.scroll = function(){
            var el = $(document.getElementById($scope.currentId));
            if($scope.horizontal){
                var scrollObj = {scrollLeft: el.offset().left};
            }else{
                scrollObj = {scrollTop: el.offset().top};
            }
            $("body").animate(scrollObj, 100, 'swing', function(){
                window.console.log('scroll call back');
            });
        };

        $scope.isInView = function(id){
            window.console.log('this is totally in view ' + id );
            $scope.currentId = id;
            $scope.resetViews();
        };

        $scope.isActiveLink = function(path, id){
            if(!$scope.currentViews){
                return null;
            }
            return ($scope.currentViews[path].id === id);
        };
        
        $scope.swipeLeft = function(id){
            window.console.log('i done swiped to '+ id);
        };
        
        $scope.navChanged = function(top){
            window.console.log(top);
        };


        $scope.masterPanelFit = 2;
        $scope.subPanelFit = .5;


    });