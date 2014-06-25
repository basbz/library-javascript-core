define(function () {
  var slice = Array.prototype.slice;

  function isFunction (fn) {
    return typeof fn === 'function';
  }

  function isArray (a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  }

  function fnContract (fn, msg) {
    if(! isFunction (fn))
      throw new TypeError(fn.toString() + 'is not function !');
  }

  Object.keys = Object.keys || function(o) {
    if (o !== Object(o))
      throw new TypeError('Object.keys called on a non-object');

    var k=[],p;

    for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);

    return k;
  };

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  Array.prototype.find = Array.prototype.find || function(predicate) {
    if (this === null)
      throw new TypeError('Array.prototype.find called on null or undefined');

    if (! isFunction(predicate))
      throw new TypeError('predicate must be a function');

    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      if (i in list) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
    }
    return undefined;
  };

  function first (arr) {
    return slice.call(arr, 0, 1)[0];
  }

  function last (arr) {
    return slice.call(arr, arr.length - 1)[0];
  }

  //https://github.com/fitzgen/wu.js/blob/master/lib/wu.js
  function compose (/* variadic number of functions */) {
    var fns = slice.call(arguments), numFns = fns.length;

    fns.forEach(fnContract);

    return function () {
      var i, returnValue = fns[numFns -1].apply(this, arguments);

      for (i = numFns - 2; i > -1; i--) {
        returnValue = fns[i](returnValue);
      }
      return returnValue;
    };
  }

  function extend (target) {
    slice.call(arguments, 1).forEach(function(source) {
      if (source)
        for (var prop in source) {
          target[prop] = source[prop];
        }
    });

    return target;
  }

  function pick (obj) {
    var copy = {}, keys = Array.prototype.concat.apply(Array.prototype, slice.call(arguments, 1));

    keys.forEach(function(key) {
      if (key in obj) copy[key] = obj[key];
    });

    return copy;
  }

  return {
    isFunction: isFunction,

    isArray: isArray,

    slice: slice,

    last: last,

    first: first,

    cid: (function (__c) {
      return function (prefix) {

        prefix = prefix || 'c-';

        return prefix + (__c += 1);
      };
    }(0)),

    rest: function (array, n) {
      return slice.call(array, n || 1);
    },

    pipe: function () {
      return compose.apply(null, slice.call(arguments).reverse());
    },

    extend: extend,

    pick: pick
  };
});
