define(['throttle'], function (throttle) {
  describe("A requestAnimationFrame Throttler", function () {
    it("can wrap a function, a execute it once", function (done) {
      var fire, spy = jasmine.createSpy('vik');

      fire = throttle(spy);
      fire();
      fire();
      fire();
      fire();

      requestAnimationFrame(function () {
        expect(spy).toHaveBeenCalled();
        expect(spy.calls.count()).toBe(1);
        done();
      });
    });
  });
});
