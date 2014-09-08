define(function () {
  // var log = throttle(console.log.bind(console, 'foo');
  // log();
  // log();
  // log();

  return function throttle (fn) {
    var state = 0;

    return function () {
      if(state)
        return;

      state = 1;
      requestAnimationFrame(function () {
        fn();
        state = 0;
      });
    };
  };
});
