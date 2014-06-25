define(['range'], function (Range) {
  describe('A Range Object', function () {
    it("can be created ", function () {
      var range = Range.create(23);

      expect(range).toBeDefined();
    });

    it("can increment a value", function () {
      var range = Range.create(23);
      expect(range.inc(3)).toBe(4);
      expect(range.inc(17)).toBe(18);
    });

    it("can decrement a value", function () {
      var range = Range.create(23);
      expect(range.dec(3)).toBe(2);
      expect(range.dec(17)).toBe(16);
    });

    it("can wrap a value according to it's index", function () {
      var range = Range.create(23);

      expect(range.inc(22)).toBe(0);
      expect(range.dec(0)).toBe(22);
      expect(range.wrap(400)).toBe(9);
    });

    it("can create a range of numbers", function () {
      var range = Range.create(23);

      expect(range.slice(-3, 4, 0)).toEqual([1, 22, 2, 21, 3, 20, 4]);

    });

    it("can expand range", function () {
      expect(Range.expand(10, {fwd: 10, bwd: 5}, {start: 0, end: 8})).toEqual({start: 0, end: 10});
      expect(Range.expand(20, {fwd: 10, bwd: 5}, {start: 3, end: 8})).toEqual({start: 0, end: 20});
      expect(Range.expand(20, {fwd: 10, bwd: 5}, {start: 13, end: 18})).toEqual({start: 0, end: 20});
      expect(Range.expand(20, {fwd: 3, bwd: 2}, {start: 3, end: 3})).toEqual({start: 1, end: 6});
      expect(Range.expand(4, {fwd: 3, bwd: 2}, {start: 3, end: 3})).toEqual({start: 0, end: 4});
    });

    it("can prioritize a range", function () {
      expect(Range.prioritize({fwd: 2, bwd: 1}, {start:0, end: 9}, 3)).toEqual([3, 4, 5, 2, 6, 7, 1, 8, 9, 0]);
      expect(Range.prioritize({fwd: 2, bwd: 1}, {start: 0, end: 12},  3)).toEqual([3, 4, 5, 2, 6, 7, 1, 8, 9, 0, 10, 11, 12]);
      expect(Range.prioritize({fwd: 2, bwd: 1}, {start: 0, end: 9}, 6)).toEqual([6, 7, 8, 5, 9, 4, 3, 2, 1, 0]);
      expect(Range.prioritize({fwd: 2, bwd: 1}, {start: 3, end: 8}, 6)).toEqual([6, 7, 8, 5, 4, 3]);
      expect(Range.prioritize({fwd: 1, bwd: 3}, {start: 3, end: 8}, 6)).toEqual([6, 7, 5, 4, 3, 8]);
    });
  });
});
