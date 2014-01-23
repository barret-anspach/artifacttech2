"use strict";angular.module("artifactApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngAnimate","angular-inview"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/platform.curation",{templateUrl:"views/platform.curation.html",controller:"MainCtrl"}).when("/platform.creation",{templateUrl:"views/platform.creation.html",controller:"MainCtrl"}).when("/platform.commerce",{templateUrl:"views/platform.commerce.html",controller:"MainCtrl"}).when("/platform.analysis",{templateUrl:"views/platform.analysis.html",controller:"MainCtrl"}).when("/platform",{templateUrl:"views/platform.main.html",controller:"MainCtrl"}).when("/work",{templateUrl:"views/work.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.main.html",controller:"MainCtrl"}).when("/about.team.2",{templateUrl:"views/about.team.2.html",controller:"MainCtrl"}).when("/about.team.3.html",{templateUrl:"views/about.team.3.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("artifactApp").controller("MainCtrl",["$scope","$location","$window","$anchorScroll",function(a,b){a.goto=function(a){window.console.log(a),-1!==a.indexOf("#")&&window.console.log(a),b.path(a)},a.pageTops={},a.showAbout=function(){a.showAbout=!0},a.isHome=!0,a.updateScrollEvent=function(a,b){}}]),angular.module("artifactApp").controller("ApplicationCtrl",["$scope","$anchorScroll","$location","$window",function(a,b,c,d){a.$location=c,a.currentId="home",a.showAbout=!1,a.isLoaded=!1,$(window).on("scroll",function(){a.$apply(function(){a.isHome=d.scrollY<50}),window.console.log(a.isHome)}),a.contentLoaded=function(){window.console.log("include loaded"),a.isLoaded=!0},a.isInView=function(b){a.currentId=b},a.isActiveLink=function(b){return b===a.currentId},a.swipeLeft=function(a){window.console.log("i done swiped to "+a)}}]),angular.module("artifactApp").directive("backgroundImg",function(){return function(a,b,c){c.$observe("backgroundImg",function(d){a.position=c.position?c.position:"center center",a.attachment=c.attachment?c.attachment:"scroll",b.css({"background-image":"url("+d+")","background-size":c.size,"background-position":a.position,"background-attachment":a.attachment,"background-repeat":"no-repeat"})})}}).directive("background",["$window",function(a){return{restrict:"A",link:function(b,c,d){$(a).resize(function(){"h"==d.background?(b.h=document.body.clientHeight,c.css({"min-height":b.h+"px"})):"w"==d.background&&(b.w=document.body.clientWidth,b.h=document.body.clientHeight,c.css({width:b.w,height:b.h}))}),d.$observe("background",function(a){"h"==a?(b.h=document.body.clientHeight,c.css({"min-height":b.h+"px"})):"w"==a&&(b.w=document.body.clientWidth,b.h=document.body.clientHeight,c.css({width:b.w,height:b.h}))})}}}]).directive("preventDefault",function(){return function(a,b){jQuery(b).click(function(a){a.preventDefault()})}}).directive("scrollTo",["$window","$location",function(a,b){return{restrict:"AC",scope:{inView:"&"},link:function(c,d,e){function f(a){$("html, body").animate(a,800,"swing",function(){c.$apply(function(){c.inView({id:h})})})}function g(d){d||a.scrollTo(0,0);var g=c.$eval(e.horizontal)||!1,h=e.home?c.$eval(e.home):!0;if(h){var i=document.getElementById(d);if(g)var j={scrollLeft:$(i).offset().left};else var j={scrollTop:$(i).offset().top}}else{b.path("/");var i=document.getElementById(d),j={scrollTop:$(i).offset().top};f(j)}i&&h&&f(j)}var h=e.scrollTo;window.console.log(h),d.bind("click",function(){g(e.scrollTo)})}}}]).directive("scrollInView",["$window","$timeout","$location",function(a){return{restrict:"A",scope:{inView:"&"},link:function(b,c,d){function e(){return s(),l=j-h,m=j-h,n=f>h,f=h,Math.abs(j-h)<g}var f,g,h,i,j,k,l,m,n,o,p,q=(angular.element(a),b.$eval(d.horizontal)||!1),r=$(c),s=function(){q?(f=$(a).scrollLeft(),g=b.$eval(d.threshold)?d.threshold:$(a).width()/2,h=$(a).scrollLeft(),i=h+$(a).width(),j=r.offset().left,k=j+r.width(),o={scrollLeft:j}):(f=$(a).scrollTop(),g=b.$eval(d.threshold)?d.threshold:$(a).height()/2,h=$(a).scrollTop(),i=h+$(a).height(),j=r.offset().top,k=j+r.height(),o={scrollTop:j})};$(window).bind("scroll",function(){clearTimeout(p),p=setTimeout(t,100)});var t=function(){var a=e(c);a&&(b.inView({id:c.attr("id")}),$("html, body").animate(o,100,"swing",function(){return clearTimeout(p),!1}))};$(document).ready(function(){})}}}]).directive("horizontalBkgdContainer",function(){return{restrict:"A",controller:function(a){a.panels=[],this.addPanel=function(b){a.panels.push(b)}},link:function(a,b,c){c.$observe("background",function(){a.panelsNo=document.getElementsByClassName("fullpage horiz").length,a.w=window.innerWidth,a.h=window.innerHeight,b.css({height:a.h+"px",width:a.w*a.panelsNo+"px"})})}}}),function(){angular.module("artifactApp").directive("spy",["$location",function(){return{restrict:"A",require:"?^scrollSpy",link:function(a,b,c,d){return null==c.spyClass&&(c.spyClass="active"),d.addSpy({id:c.spy,"in":function(){return b.addClass(c.spyClass)},out:function(){return b.removeClass(c.spyClass)}})}}}]),angular.module("artifactApp").directive("scrollSpy",["$window",function(a){return{restrict:"A",controller:["$scope",function(a){a.spies=[],this.addSpy=function(b){return console.log(b),a.spies.push(b)}}],link:function(b,c){var d;return d=[],b.$watch("spies",function(a){var b,e,f,g;for(g=[],e=0,f=a.length;f>e;e++)b=a[e],g.push(null==d[b.id]?d[b.id]=c.find("#"+b.id):void 0);return g}),$(a).scroll(function(){var e,f,g,h,i,j;for(e=null,j=b.spies,h=0,i=j.length;i>h;h++)g=j[h],g.out(),d[g.id]=0===d[g.id].length?c.find("#"+g.id):d[g.id],0!==d[g.id].length&&(f=d[g.id].offset().top)-a.scrollY<=0&&(g.pos=f,null==e&&(e=g),e.pos<g.pos&&(e=g));return null!=e?e["in"]():void 0})}}}])}.call(this);