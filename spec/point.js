define(['point'], function (Point) {

  describe("a Point", function () {
    var p = Point.create(100, 100);

    it("has a x value", function () {
      expect(p.value().x).toBe(100);
    });

    it("has a y value", function () {
      expect(p.value().y).toBe(100);
    });


    it("can be within a $(element)", function () {
      expect(p.within([0, 0, 300, 300])).toBe(true);
    });
  });
});
