define(['emitter'], function (Emitter) {
  describe("Emitter", function () {
    it("can bind callbacks", function () {
      var binding, emit = Emitter.create(),
          spy = jasmine.createSpy('emitter');

      binding = emit.bind(spy);
      emit.fire();
      expect(spy).toHaveBeenCalled();
      expect(spy.calls.count()).toBe(1);
    });

    it("can bind, release callbacks", function () {
      var binding, emit = Emitter.create(),
          spy = jasmine.createSpy('emitter');

      binding = emit.bind(spy);
      emit.fire();
      expect(spy).toHaveBeenCalled();
      binding.release();
      emit.fire();
      emit.fire();
      expect(spy.calls.count()).toBe(1);
    });
 });
});
