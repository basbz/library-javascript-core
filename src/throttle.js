define(['vb-core/nodash'], function (__) {
  // var log = throttle(console.log.bind(console, 'foo');
  // log();
  // log();
  // log();

  return function throttle (fn, context) {
    var state = 0;

    return function () {
      if(state)
        return;

      var args = __.slice.call(arguments);

      state = 1;
      requestAnimationFrame(function () {
        fn.apply(context, args);
        state = 0;
      });
    };
  };
});
