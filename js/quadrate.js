var Quadrate = function(canvasContext, point, size, coloure) {
  this.canvasContext = canvasContext;
  this.point = point;
  this.size = size;
  this.coloure = coloure;
  this.draw();
};

Quadrate.prototype = {
  draw: function() {
    this.canvasContext.fillStyle = this.coloure;
    this.canvasContext.fillRect(this.point.getX(), this.point.getY(), this.size, this.size);
  }
};
