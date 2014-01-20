(function() {
  'use strict';
  var createTestView;

  createTestView = function(elemHtml, bef, aft) {
    var test;
    test = {
      elem: null,
      scope: null
    };
    beforeEach(inject(function($rootScope, $compile) {
      test.elem = angular.element(elemHtml);
      $('body,html').css('height', '100%');
      $('body').append(test.elem);
      test.scope = $rootScope.$new(true);
      test.scope.inviewSpy = jasmine.createSpy('inviewSpy');
      test.spyCalls = 0;
      test.scrollAndWaitInView = function(scroll, callback) {
        var _ref;
        test.spyCalls = test.scope.inviewSpy.calls.length;
                if ((_ref = typeof scroll === "function" ? scroll() : void 0) != null) {
          _ref;
        } else {
          $(window).scrollTop(scroll);
        };
        waitsFor((function() {
          return test.scope.inviewSpy.calls.length > test.spyCalls;
        }), 'Scrolling should trigger an in view', 500);
        if (callback != null) {
          return runs(function() {
            return callback();
          });
        }
      };
      $compile(test.elem)(test.scope);
      test.scope.$digest();
      if (typeof bef === "function") {
        bef();
      }
      return test.scrollAndWaitInView(0);
    }));
    afterEach(function() {
      var _ref, _ref1;
      if ((_ref = test.scope) != null) {
        _ref.$destroy();
      }
      test.scope = null;
      if ((_ref1 = test.elem) != null) {
        _ref1.remove();
      }
      test.elem = null;
      return typeof aft === "function" ? aft() : void 0;
    });
    return test;
  };

  describe('Directive: inView', function() {
    var test;
    beforeEach(module('angular-inview'));
    test = createTestView("<div id=\"zero\" in-view=\"inviewSpy(0, $inview, $inviewpart)\" style=\"height:0\"></div>\n<div id=\"one\" in-view=\"inviewSpy(1, $inview, $inviewpart)\" style=\"height:100%\">one</div>\n<div id=\"two\" in-view=\"inviewSpy(2, $inview, $inviewpart)\" style=\"height:100%\">two</div>\n<div id=\"three\" in-view=\"inviewSpy(3, $inview, $inviewpart)\" in-view-offset=\"{{threeOffset}}\" style=\"height:100%\">three</div>");
    it('should initially execute the expression only for visible elements', function() {
      return runs(function() {
        expect(test.scope.inviewSpy.calls.length).toEqual(2);
        expect(test.scope.inviewSpy).toHaveBeenCalledWith(0, true, 'both');
        return expect(test.scope.inviewSpy).toHaveBeenCalledWith(1, true, 'top');
      });
    });
    return it('should change the inview status on scrolling', function() {
      return test.scrollAndWaitInView(window.innerHeight / 2, function() {
        expect(test.scope.inviewSpy.calls.length - test.spyCalls).toEqual(3);
        expect(test.scope.inviewSpy).toHaveBeenCalledWith(0, false, void 0);
        expect(test.scope.inviewSpy).toHaveBeenCalledWith(1, true, 'bottom');
        expect(test.scope.inviewSpy).toHaveBeenCalledWith(2, true, 'top');
        return test.scrollAndWaitInView(window.innerHeight * 2, function() {
          expect(test.scope.inviewSpy.calls.length - test.spyCalls).toEqual(3);
          expect(test.scope.inviewSpy).toHaveBeenCalledWith(1, false, void 0);
          expect(test.scope.inviewSpy).toHaveBeenCalledWith(2, true, 'bottom');
          return expect(test.scope.inviewSpy).toHaveBeenCalledWith(3, true, 'top');
        });
      });
    });
  });

  describe('Directive: inViewContainer', function() {
    var test;
    beforeEach(module('angular-inview'));
    test = createTestView("<div id=\"container1\" in-view-container style=\"height:100%\">\n	<div id=\"c1zero\" in-view=\"inviewSpy(10, $inview, $inviewpart)\" style=\"height:0\"></div>\n	<div id=\"c1one\" in-view=\"inviewSpy(11, $inview, $inviewpart)\" style=\"height:100%\">one</div>\n	<div id=\"c1two\" in-view=\"inviewSpy(12, $inview, $inviewpart)\" style=\"height:100%\">two</div>\n	<div id=\"container2\" in-view-container style=\"height:100%;overflow:scroll;\">\n		<div id=\"c2zero\" in-view=\"inviewSpy(20, $inview, $inviewpart)\" style=\"height:0\"></div>\n		<div id=\"c2one\" in-view=\"inviewSpy(21, $inview, $inviewpart)\" style=\"height:100%\">one</div>\n		<div id=\"c2two\" in-view=\"inviewSpy(22, $inview, $inviewpart)\" style=\"height:100%\">two</div>\n	</div>\n	<div id=\"c1three\" in-view=\"inviewSpy(13, $inview, $inviewpart)\" in-view-offset=\"{{threeOffset}}\" style=\"height:100%\">three</div>\n</div>", function() {
      return test.elem2 = test.elem.find('#container2');
    });
    it('should fire inview with windows scroll', function() {
      return test.scrollAndWaitInView(window.innerHeight * 2, function() {
        expect(test.scope.inviewSpy.calls.length).toEqual(2 + 5);
        expect(test.scope.inviewSpy).toHaveBeenCalledWith(12, true, 'bottom');
        expect(test.scope.inviewSpy).toHaveBeenCalledWith(20, true, 'both');
        return expect(test.scope.inviewSpy).toHaveBeenCalledWith(21, true, 'top');
      });
    });
    return it('should trigger inview with container scroll for all nested children', function() {
      return test.scrollAndWaitInView((function() {
        $(window).scrollTop(window.innerHeight * 2);
        return test.elem2.scrollTop(window.innerHeight);
      }), function() {
        expect(test.scope.inviewSpy.calls.length).toEqual(2 + 5);
        expect(test.scope.inviewSpy).toHaveBeenCalledWith(12, true, 'bottom');
        expect(test.scope.inviewSpy).toHaveBeenCalledWith(21, true, 'bottom');
        return expect(test.scope.inviewSpy).toHaveBeenCalledWith(22, true, 'top');
      });
    });
  });

}).call(this);
