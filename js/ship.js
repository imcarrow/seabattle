var TYPE_SHIP_SINGLE = 1;
var TYPE_SHIP_DOUBLE = 2;
var TYPE_SHIP_TRIPLE = 3;
var TYPE_SHIP_QUADRUPLE = 4;

var HORIZONTAL_DIRECTION = 'horizontal';
var VERTICAL_DIRECTION = 'vertical';

var Ship = function(arena, block, direction, typeShip) {
  this.arena = arena;
  this.block = block;
  this.blocks = [block];
  this.direction = direction;
  this.type = typeShip;
  this.hitCount = 0;
  this.setBlocks();
  if(arena.name == 'human') {
    this.draw();
  }
  this.isKilled = false;
}

Ship.prototype = {
  setBlocks: function() {
      this.arena.blocks[this.block.cell[0]][this.block.cell[1]].ship = this;
      for(var i = 1 ; i < this.type; i++) {
        if(this.direction == HORIZONTAL_DIRECTION) {
          var block = this.arena.blocks[this.block.cell[0]][this.block.cell[1]+i];
          this.arena.blocks[this.block.cell[0]][this.block.cell[1]+i].ship = this;
          this.blocks.push(block);
        } else {
          var block = this.arena.blocks[this.block.cell[0]+i][this.block.cell[1]];
          this.arena.blocks[this.block.cell[0]+i][this.block.cell[1]].ship = this;
          this.blocks.push(block);
        }
      }
  },
  draw: function() {
    for(var i = 0; i < this.blocks.length; i++) {
      if(this.blocks[i].hit == true) {
        this.blocks[i].coloure = (this.isKilled == true) ? Coloure.red : Coloure.green;
      } else {
        this.blocks[i].coloure = Coloure.brown;
      }
      this.blocks[i].draw();
    }
  },

  hit: function(block) {
    for(var i = 0; i < this.blocks.length; i++) {
      if(this.blocks[i] == block && this.blocks[i].hit == undefined) {
        this.blocks[i].hit = true;
        this.blocks[i].draw(((this.isKilled == true) ? Coloure.red : Coloure.green));
        this.hitCount++;
        break
      }
    }
    if(this.hitCount == this.type) {
      this.isKilled = true;
      log.add(this.arena.name + ': убит');
      this.draw();
    }
  }
}
