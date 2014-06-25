define(['vb-core/nodash'], function (__) {
  function inc (val) {
    return val + 1;
  }

  function dec (val) {
    return val - 1;
  }

  function __clip(limit, range) {
    return {
      start: (range.start > 0 ? range.start : 0),
      end: (range.end < limit ? range.end : limit)
    };
  }

  function __redistibute (limit, range) {
    return {
      start: range.start - (range.end > limit ? range.end - limit : 0),
      end: range.end - (range.start < 0 ? range.start : 0)
    };
  }

  function expand (limit, spread, range) {
    return __clip(limit, __redistibute(limit, {
      start: range.start - spread.bwd,
      end: range.end + spread.fwd
    }));
  }


  function shuffle (spread, range, current) {
    var ret = [], i = current, len = range.end + 1;

    for(; i < len; i++) {
      ret.push(i);
    }

    var n = 0, m = spread.fwd + 1;

    for(i = current - 1, len = range.start -1; i > len; i--) {
      if(n === spread.bwd) {
        n = 0;
        m += spread.fwd;
      }

      ret.splice(m, 0,  i);
      m++;
      n++;
    }

    return ret;
  }

  function __wrap (limit, index) {
    return (limit + index) % limit;
  }

  return {
    expand: expand,

    prioritize: shuffle,

    create: function  (limit) {
      var wrap = __wrap.bind(null, limit);

      return {
        wrap: wrap,

        inc: __.pipe(inc, wrap),

        dec: __.pipe(dec, wrap),

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
});
