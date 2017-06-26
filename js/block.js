var Block = function(canvasContext, point, size, cell) {
  this.canvasContext = canvasContext;
  this.point = point;
  this.size = size;
  this.coloure = Coloure.blue;
  this.quadrate = new Quadrate(this.canvasContext, point, this.size, this.coloure);
  this.ship = null;
  this.cell = cell;
}

Block.prototype = {
  changeState: function() {
    if(gameplay.stage == STAGE_ARANGE_SHIPS) {
      var ship = new Ship(this);

      var neighbors = this.findNeighbors();
      //Если установили однопалубный корабль
      if(neighbors.lenght == 0 && gameplay.countShip1 > 0) {
        var ship = new Ship(this);
        this.ship = ship;
        gameplay.countShip1 -= 1;
        var singleShip = document.getElementById('single-ship');
        singleShip.textContent = gameplay.countShip1;
        return true;
      }
    }
  },

  draw: function(coloure) {
    this.quadrate.coloure = (coloure == undefined) ? this.coloure : coloure;
    this.quadrate.draw();
  },

  findNeighbors: function(name) {
    var result = [];
    var i = this.cell[0];
    var j = this.cell[1];
    var blocks = arenas[name].blocks;
    if((i - 1 >= 0) && blocks[i - 1][j].ship !== null) {
      result.push(blocks[i - 1][j]);
    }
    if((i + 1 <= 9) && blocks[i + 1][j].ship !== null) {
      result.push(blocks[i + 1][j])
    }
    if((j - 1 >= 0) && blocks[i][j - 1].ship !== null) {
      result.push(blocks[i][j - 1]);
    }
    if((j + 1 <= 9) && blocks[i][j + 1].ship !== null) {
      result.push(blocks[i][j + 1]);
    }
    if((i - 1 >= 0) && (j - 1 >= 0) && blocks[i - 1][j - 1].ship !== null) {
      result.push(blocks[i - 1][j - 1]);
    }
    if((i + 1 <= 9) && (j - 1 >= 0) && blocks[i + 1][j - 1].ship !== null) {
      result.push(blocks[i + 1][j - 1]);
    }
    if((i - 1 >= 0) && (j + 1 <= 9) && blocks[i - 1][j + 1].ship !== null) {
      result.push(blocks[i - 1][j + 1]);
    }
    if((i + 1 <= 9) && (j + 1 <= 9) && blocks[i + 1][j + 1].ship !== null) {
      result.push(blocks[i + 1][j + 1]);
    }
    return result;
  }
}
