define(['vb-core/nodash'], function (__) {
  var _c = 0;

  function Emitter () {
    this.callbacks = [];
  }

  //static
  __.extend(Emitter, {
    create: function () {
      return new Emitter();
    },

    fire: function (callbacks, args) {
      callbacks.forEach(function (spec) {
        spec.fn.apply(spec.context, args);
      });
    },

    bind: function (registry, fn, context) {
      var cid = 'c-' + (_c += 1);

      registry.push({cid: cid, fn: fn, context: context});

      return cid;
    },

    release: function (registry, cid) {
      return registry.filter(function (spec) {
        return spec.cid !== cid;
      });
    }
  });
  //

  Emitter.prototype = {
    bind: function (fn, context) {
      var cid = Emitter.bind(this.callbacks, fn, context);

      return {
        release: function () {
          this.callbacks = Emitter.release(this.callbacks, cid);
        }.bind(this)
      };
    },

    fire: function () {
      Emitter.fire(this.callbacks, __.slice.call(arguments));
    }
  };

  return Emitter;
});
