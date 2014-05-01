define(function () {

  function currentTime () {
    return new Date().getTime();
  }

  return function repeat (fn, fps) {
    var raf;

    fps = fps || 1000 / 40;

    function run () {
      var now = currentTime();

      if(now - started > fps) {
        fn();
        started = now;
      }

      raf = requestAnimationFrame(run);
    }

    started = currentTime();
    raf = requestAnimationFrame(run);

    return function clear () {
      cancelAnimationFrame(raf);
    };
  };
});
