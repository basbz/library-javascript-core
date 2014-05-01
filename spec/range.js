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
  });
});
