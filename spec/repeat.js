define(['repeat'], function (repeat) {
  describe("repeat", function () {
    it("can repeatedly fire a function", function (done) {
      var spy = jasmine.createSpy('fire');

      var clear = repeat(spy);

      setTimeout(function resolve () {
        var count = spy.calls.count();
        expect(count > 1).toBe(true);
        clear();
        expect(spy.calls.count()).toBe(count);
        done();
      }, 250);
    });
  });
});
