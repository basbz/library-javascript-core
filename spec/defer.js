define(['defer'], function (Defer) {
  describe("Defer", function () {
    it("can create a promise", function () {
      var defer = Defer();

      expect(defer.promise).toBeDefined();
    });

    it("can resolve a promise (with arguments)", function (done) {
      var defer = Defer(),
          spy = jasmine.createSpy("resolve");

      defer.promise.then(spy);
      defer.resolve('foo');

      setTimeout(function () {
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('foo');
        done();
      }, 0);

    });
  });
});
