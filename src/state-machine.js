define(['vb-core/nodash'], function (__) {
  function StateMachine (states, context, eventEmitter) {
    this._states = states;
    this._eventEmitter = {fire: function () {}};
    this._context = context;
    this._before = {};

    if(eventEmitter && eventEmitter.fire && eventEmitter.fire.call)
      this._eventEmitter = eventEmitter;
  }

  StateMachine.prototype = {
    setState: function (state) {
      this.state = state;
      this._eventEmitter.fire('change:state', state);
    },

    handleEvent: function (e) {
      var args = __.rest(arguments);

      if(this._before[e] && !this.passesBefores(e, args))
        return;

      if(this._states[this.state] && this._states[this.state][e])
        return this.invoke(this._states[this.state][e], __.rest(arguments));
    },

    invoke: function (fn, args) {
      args.unshift(this);

      return fn.apply(this._context, args);
    },

    before: function (e, fn) {
      this._before[e] = this.before[e] || [];
      this._before[e].push(fn);
    },

    passesBefores: function (e, args) {
      return this._before[e].every(function (fn) {
        return this.invoke(fn, args);
      }, this);
    }
  };

  return {
    create: function (states, context, observer) {
      var stateMachine = Object.create(StateMachine.prototype);

      StateMachine.apply(stateMachine, arguments);

      return stateMachine;
    }
  };
});

