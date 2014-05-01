define(['lib/nodash'], function (__) {
  function inc (val) {
    return val + 1;
  }

  function dec (val) {
    return val - 1;
  }

  var Range = {
    wrap: function (limit, index) {
      return (limit + index) % limit;
    },

    create: function  (limit) {
      var wrap = Range.wrap.bind(null, limit);

      return {
        wrap: wrap,

        inc: __.pipe(wrap, inc),

        dec: __.pipe(wrap, dec),

        slice: function (bwd, fwd, index) {
          var ret = [], n = 1, limit;

          i = inc(index);
          limit = i + fwd;

          for(; i < limit; i+= 1) {
            ret.push(wrap(i));
          }

          i = dec(index);
          limit = i + bwd;

          for(; i > limit; i -= 1) {
            ret.splice(n, 0, wrap(i));
            n += 2;
          }

          return ret;
        }
      };
    }
  };

  return Range;
});
