define(['watch'], function (Watch) {
  describe("Watch", function () {
    it("can observe an event", function () {
      var watch = Watch.create(),
          spy = jasmine.createSpy('watcher');

      watch.on('fire', spy);
      watch.fire('fire');

      expect(spy).toHaveBeenCalled();
    });

    it("can observe all events", function () {
      var watch = Watch.create(),
          spy = jasmine.createSpy('watcher');

      watch.on('*', spy);
      watch.fire('fire');

      expect(spy).toHaveBeenCalled();
    });


    it("can unobserve an event", function () {
      var binding, watch = Watch.create(),
          spy = jasmine.createSpy('watcher');

      binding = watch.on('fire', spy, {});
      watch.fire('fire');
      binding.release();
      watch.fire('fire');

      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toBe(1);
    });
 });
});
