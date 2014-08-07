define(['nodash'], function (__) {
  describe("Nodash provides a subset of Underscore/Lodash type of functiontionality", function () {
    it("can compose/pipe functions", function () {
      /* pipe executes in reading order, compose in reverse */

      var spies = [jasmine.createSpy('one'), jasmine.createSpy('zero')],
          foo = __.pipe(spies[0], spies[1]);

      foo('bar');
      expect(spies[0]).toHaveBeenCalledWith('bar');
      expect(spies[1]).toHaveBeenCalled();
    });

    describe(".pick ", function () {
      it("can cherry pick an objects properties", function () {
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

    describe(".where", function () {
      it("returns true if the test and object properties are equal", function () {
        var where = __.where({son: 'Vivek'});

        expect(where({})).toBe(false);
        expect(where({son: "Vik"})).toBe(false);
        expect(where({son: "Vivek"})).toBe(true);
      });

      it("can be used as a list comparator", function () {
        var cities = [
          {name: 'Amsterdam'},
          {name: 'Den Haag'},
          {name: 'Rotterdam'},
          { name: 'Utrecht'}
        ];

        expect(cities.find(__.where({name: 'Rotterdam'}))).toEqual({name: 'Rotterdam'});
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

    describe(".first", function () {
      it("can return the array's first element | undefined", function () {
        expect(__.first([1, 2, 3])).toBe(1);
        expect(__.first([])).toBe(undefined);
      });
    });

    describe(".last", function () {
      it("can return the array's last element | undefined", function () {
        expect(__.last([1, 2, 3])).toBe(3);
        expect(__.last([])).toBe(undefined);
      });
    });

    describe(".cid", function () {
      it("can generate a basic 'unique' id", function () {
        expect(__.cid()).not.toEqual(__.cid());
        expect(__.cid()).not.toEqual(__.cid());
        expect(__.cid()).not.toEqual(__.cid());
      });
    });
  });
});
