var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

Point.prototype = {
  getX: function() {
    return this.x;
  },
  getY: function() {
    return this.y;
  }
};
