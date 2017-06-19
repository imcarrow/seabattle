var Block = function(canvasContext, point, size) {
  this.canvasContext = canvasContext;
  this.point = point;
  this.size = size;
  this.coloure = Coloure.blue;
  this.quadrate = new Quadrate(this.canvasContext, point, this.size, this.cloure);
}

Block.prototype = {

}
