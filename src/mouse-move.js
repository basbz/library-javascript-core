define(['vb-core/emitter', 'vb-core/point'], function (Emitter, Point) {

  var emitter = Emitter.create();

  $(document).ready(function () {
    $('html').mousemove(function (e) {
      var point = Point.create(e.pageX, e.pageY);

      requestAnimationFrame(emitter.fire.bind(emitter, point));
    });
  });

  return emitter.bind.bind(emitter);
});
