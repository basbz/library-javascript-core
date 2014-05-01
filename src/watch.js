define(['lib/nodash', 'lib/emitter'], function (__, Emitter) {
  function EventEmitter () {
    this.events = {};
  }

  EventEmitter.create = function () {
    return new EventEmitter();
  };

  EventEmitter.prototype = {
    on: function (e, fn, context) {
      var cid = Emitter.bind((this.events[e] = this.events[e] || []), fn, context);

      return {
        release: function () {
          this.events[e] = Emitter.release(this.events[e], cid);
        }.bind(this)
      };
    },

    fire: function (e) {
      var args = __.slice.call(arguments, 1);

      Emitter.fire(this.events[e] || [], args);
      args.unshift(e);
      Emitter.fire(this.events['*'] || [], args);
    }
  };

  return EventEmitter;
});
