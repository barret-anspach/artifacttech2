'use strict';

angular.module('artifactApp')
    .controller('ApplicationCtrl', function ($scope, $anchorScroll, $location, $window, $timeout, currentId, $modal) {

        $scope.$location = $location;
        $scope.currentId = currentId;
        $scope.currentPath = $location.url();
        
        $scope.currentAboutIndex = 0;
        $scope.currentPlatformIndex = 0;
        $scope.currentWorkIndex = 0;

        this.snapTo = function(id){
            window.console.log(id);
        };

        $scope.index = {about: 0 , platform: 0, work: 0};

        $scope.userAgent = navigator.userAgent.toLowerCase();
//        window.console.log($scope.userAgent);

        $scope.isMobile = function(){
            var isMobile = false;
            var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
            for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) isMobile = true;
            currentId.isMobile = isMobile;
            return isMobile
        };

        $scope.videos = {
            fonograf1: "http://player.vimeo.com/video/65173823",
            fonograf2: "http://player.vimeo.com/video/84422518"
        };


        $scope.openPlayer = function(videoName){

            $scope.videoUrl = $scope.videos[videoName];

            var modal = $modal.open({
                templateUrl: "/views/video.html",
                controller: 'VideoCtrl',
                resolve: {
                    video: function(){
                        return $scope.videoUrl;
                    }
                }
            });

            modal.result.then(function(){
                window.console.log('closed');
            }, function(){
                window.console.log('user cancelled');
            })


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
            {url:"/panels/robb.html", id: 'robb', background: '../images/bg/AT_team-bg.png'},
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
                {url: '/panels/work-lens.html', id:'work-lens', background: '../images/bg/AT_our-work-bg-3.png'},
                {url: '/panels/work-fonograf.html', id:'work-fonograf', background: '../images/bg/AT_our-work-bg-2.png'}
            ]
        };

        $scope.currentViews = {};

        if($scope.isMobile()){
            $scope.views.about = $scope.mobileAbout;
        }
        

        $scope.resetViews = function(){

            window.console.log($scope.currentAboutIndex);
            angular.forEach($scope.views, function (value, key) {
                $scope.currentViews[key] = value[0];
                $scope.index[key] = 0;
            });
        };

        $scope.currentViewById = function(key, id){
            $scope.currentView = key;
            currentId.setId(key);
            $scope.currentViews[key] = _.find($scope.views[key], {id: id});
            $scope.index[key] = $scope.views[key].indexOf($scope.currentViews[key]);
            window.console.log(currentId.currentId);
        };

        $scope.nextView = function(key){
            $scope.index[key] +=1;
            $scope.currentViews[key] = $scope.views[key][$scope.index[key]];
            window.console.log($scope.currentViews[key]);
        };

        $scope.isAbout = function(){
          return(currentId.currentId === 'about')
        };

        $scope.previousView = function(key){
            $scope.index[key] -= 1;
            $scope.currentViews[key] = $scope.views[key][$scope.index[key]];
        };

        $scope.resetViews();

        $scope.isLoaded = false;
        $scope.isHome = true;
        var lastScroll = $window.scrollY;

        $(window).on('scroll', function(){
            var thisScroll = $window.scrollY;
            lastScroll = thisScroll;
            $scope.$apply(function(){
                $scope.isHome = ($window.scrollY < 300);
            });
        });
        
        $scope.$watch('currentId.currentId', function(newVal){
            if(newVal){
                $timeout(function(){
                    $scope.resetViews();
                }, 1000);
            }
        });
        
        
        
        $scope.contentLoaded = function(){
            $scope.isLoaded = true;
        };


        $scope.isActiveLink = function(path, id){
            if(!$scope.currentViews){
                return null;
            }
            if(_.isUndefined(id)){
                return $scope.currentView === path;
            }

            return($scope.views[path][$scope.index[path]].id === id);

//            return ($scope.currentViews[path].id === id);
        };
        
        $scope.swipeLeft = function(id){
            window.console.log('i motherfucking swiped left');
        };
        
        $scope.swipeUp = function(id){
            window.console.log('i motherfucking swiped left');
        };


    });

angular.module('artifactApp')
    .controller('VideoCtrl', function ($scope, $modalInstance, video) {
       $scope.videoUrl = video;

       $scope.cancel = function () {
            $modalInstance.dismiss();
          };

        $scope.close = function () {
          $modalInstance.close();
        }
});
