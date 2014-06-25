define(['vb-core/nodash'], function (__) {
  function Point (x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype = {
    value: function () {
      return {x: this.x, y: this.y};
    },

    within: function (rect) {
      if(! __.isArray(rect) || this.x < rect[0] || this.y < rect[1] || this.x > rect[2] || this.y > rect[3])
        return false;

      return true;
    }
  };

  return {
    create: function (x, y) {
      return new Point(x, y);
    }
  };
});
