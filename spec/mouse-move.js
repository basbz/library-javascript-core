define(['mouse-move'], function (onMouseMove) {
  describe("Mouse Move", function () {

    it("can fire a callback on mouse-move", function (done) {
      var spy = jasmine.createSpy('move');

      function resolve (point) {
        expect(spy).toHaveBeenCalled();
        expect(point.x).toBe(150);
        expect(point.y).toBe(50);
        done();
      }

      onMouseMove(spy.and.callFake(resolve));

      $('html').trigger({
        type: 'mousemove',
        pageX: 150,
        pageY: 50
      });
    });
  });
});
