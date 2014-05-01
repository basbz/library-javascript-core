define(['nodash'], function (__) {
  describe("Nodash provides a subset of Underscore/Lodash type of functiontionality", function () {
    it("can compose/pipe functions", function () {
      var spies = [jasmine.createSpy('one'), jasmine.createSpy('zero')],
          foo = __.pipe(spies[1], spies[0]);

      foo('bar');
      expect(spies[0]).toHaveBeenCalledWith('bar');
      expect(spies[1]).toHaveBeenCalled();
    });

    describe("Nodash can cherry pick an objects properties", function () {
      it("can", function () {
        var result = __.pick({a: 1, b: 2, c: 3}, 'a', 'c');
        expect(result).toEqual({a: 1, c: 3});
      });

      it("can restrict properties to those named in an array", function () {
        var result = __.pick({a: 1, b: 2, c: 3}, ['b', 'c']);
        expect(result).toEqual({b: 2, c: 3}); 
      });


      it("can include prototype props", function () {
        var Obj = function(){};
        Obj.prototype = {a: 1, b: 2, c: 3};
        expect(__.pick(new Obj(), 'a', 'c')).toEqual({a: 1, c: 3});
      });
    });

    describe(".rest", function () {
      it("can get all but the first element of `array` | `arguments`", function () {
        expect(__.rest([1, 2, 3])).toEqual([2, 3]);

        (function () {
          expect(__.rest(arguments)).toEqual([2, 3]);
        }(1, 2, 3));
      });
    });
  });
});