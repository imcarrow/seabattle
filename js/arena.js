var Arena = function(name, width, height) {
  this.name = name;
  this.height = height;
  this.width = width;
  this.coloure = Coloure.blue;
  this.point = new Point(10, 10);
  this.size = 300;
  this.blocks = new Array;
  this.ships = new Array;
  this.createCanvas();
  this.draw();
  this.setBlocks();
  this.drawGrid();

  this.countShip1 = 4;
  this.countShip2 = 3;
  this.countShip3 = 2;
  this.countShip4 = 1;
}

Arena.prototype = {
  createCanvas: function() {
    var canvas = document.createElement('canvas');
    canvas.id = this.name;
    canvas.height = this.height;
    canvas.width = this.width;
    document.body.appendChild(canvas);
    this.canvasPosition = {
      x: canvas.getBoundingClientRect().left,
      y: canvas.getBoundingClientRect().top,
    };
    var cs = document.getElementById(this.name);
    if (cs.getContext) {
        this.context = cs.getContext('2d');
        this.cs = cs;
        cs.addEventListener("mousedown", gameplay.mouseDown, false);
    } else {
        alert("Браузер должен поддерживать canvas");
    }
  },

  draw: function() {
    this.quadrate = new Quadrate(this.context, this.point, this.size, this.coloure);
  },

  drawGrid: function() {
    var h = this.size/10;
    for(var i = 0; i < 10; i++) {
      var yg = (i == 0) ? this.point.getY() : this.point.getY() + (h * i);
      this.context.moveTo(this.point.getX(), yg);
      this.context.lineTo(this.point.getX() + this.size, yg);

      var xg = (i == 0) ? this.point.getX() : this.point.getX() + (h * i);
      this.context.moveTo(xg, this.point.getY());
      this.context.lineTo(xg, this.point.getY() + this.size);
    };
    this.context.strokeStyle = Coloure.brown;
    this.context.stroke();
  },

  setBlocks: function() {
    var h = this.size/10;
    for(var i = 0; i < 10; i++) {
      this.blocks[i] = new Array;
      var yg = (i == 0) ? this.point.getY() : this.point.getY() + (h * i);
      for(var j = 0; j < 10; j++) {
        var xg = (j == 0) ? this.point.getX() : this.point.getX() + (h * j);
        this.blocks[i][j] = new Block(this.context, new Point(xg, yg), h, [i , j]);
      }
    }
  },

  click: function(x, y) {
    return this.findBlock(x, y);
  },

  findBlock: function(x, y) {
    var result;
    for(var i = 0; i < 10; i++) {
      for(var j = 0; j < 10; j++) {
        x1 = this.blocks[i][j].point.getX() + this.canvasPosition.x;
        y1 = this.blocks[i][j].point.getY() + this.canvasPosition.y;
        size = this.blocks[i][j].size;
        if((x >= x1 && x<= x1 + size) && (y>= y1 && y < y1 + size)) {
          result = this.blocks[i][j];
          break;
        }
      }
    }
    return result;
  },

  createShip: function(block, autoArrange) {
    if(this.countShip4 > 0) {
      if(this.checkPossibleCreateShips(block, this.direction, TYPE_SHIP_QUADRUPLE, autoArrange)) {
        this.ships.push(new Ship(this, block, gameplay.direction, TYPE_SHIP_QUADRUPLE));
        this.countShip4 -= 1;
      }
    } else if(this.countShip3 > 0) {
       if(this.checkPossibleCreateShips(block, this.direction, TYPE_SHIP_TRIPLE, autoArrange)) {
          this.ships.push(new Ship(this, block, gameplay.direction, TYPE_SHIP_TRIPLE));
          this.countShip3 -= 1;
        }
    } else if(this.countShip2 > 0) {
      if(this.checkPossibleCreateShips(block, this.direction, TYPE_SHIP_DOUBLE, autoArrange)) {
        this.ships.push(new Ship(this, block, gameplay.direction, TYPE_SHIP_DOUBLE));
        this.countShip2 -= 1;
      }
    } else if(this.countShip1 > 0) {
      if(this.checkPossibleCreateShips(block, this.direction, TYPE_SHIP_SINGLE, autoArrange)) {
        this.ships.push(new Ship(this, block, gameplay.direction, TYPE_SHIP_SINGLE));
        this.countShip1 -= 1;
      }
    }
    if(this.countShip1 == 0 && this.name == 'human') {
      log.add('Корабли закончились. Для начала игры нажмите <button onclick="gameplay.startGame();">Начать игру</button>');
    }
  },

  checkPossibleCreateShips: function(block, direction, typeShip, autoArrange) {
    var result = !(block.findNeighbors(this.name).length > 0);
    for(var i = 1 ; i < typeShip; i++) {
      if(gameplay.direction == HORIZONTAL_DIRECTION) {
        if(block.cell[1]+i > 9 || block.cell[1]+i < 0) {
          result = false;
          break;
        }
        if(this.blocks[block.cell[0]][block.cell[1]+i].findNeighbors(this.name).length > 0) {
          result = false;
          break;
        }
      } else {
        if(block.cell[0]+i > 9 || block.cell[0]+i < 0) {
          result = false;
          break;
        }
        if(this.blocks[block.cell[0]+i][block.cell[1]].findNeighbors(this.name).length > 0) {
          result = false;
          break;
        }
      }
    }
    if(!result && !autoArrange) {
      log.add('Между кораблями должна должно быть пространство в одну клетку!');
    }
    return result;
  },

  arrangeShips: function() {
    var max = 10;
    var min = 0;
    var countIteration = 10000;
    do {
      direction = Math.floor( Math.random() * 2 );
      gameplay.direction = direction ? VERTICAL_DIRECTION : HORIZONTAL_DIRECTION;
      var i = parseInt(Math.random() * (max - min) + min);
      var j = parseInt(Math.random() * (max - min) + min);
      this.createShip(this.blocks[i][j], true);
    } while ((this.countShip1 > 0 || this.countShip2 > 0 || this.countShip3 > 0 || this.countShip4 > 0) && ( (countIteration--) > 0));
  },

  shot: function(block) {
    var result = false;
    if(block.ship !== null) {
      block.ship.hit(block);
      result = true;
      log.add(this.name + ': ранен [' + (block.cell[0] + 1) + '][' + (block.cell[1] + 1) + ']');
    } else {
      block.quadrate.coloure = Coloure.darkgray;
      block.quadrate.draw();
      log.add(this.name + ': мимо [' + (block.cell[0] + 1) + '][' + (block.cell[1] + 1) + ']');
    }
    this.blocks[block.cell[0]][block.cell[1]].hit = result;
    if(this.allShipsKilled() == true) {
      alert('Победил ' + ((this.name == 'human') ? 'Компьютер' : 'Игрок'));
    }
    return result;
  },

  allShipsKilled: function() {
    var result = true;
    for(var i = 0; i < this.ships.length; i++) {
      if(this.ships[i].isKilled == false) {
        result = false;
        break;
      }
    }
    return result;
  },

  shotAI: function() {
    var isHit;
    do {
      var max = 10;
      var min = 0;
      var i = parseInt(Math.random() * (max - min) + min);
      var j = parseInt(Math.random() * (max - min) + min);
      if(this.blocks[i][j].hit == undefined) {
        var isHit = this.shot(this.blocks[i][j]);
        if(isHit == true) {
          this.shotAI();
        }
      }
    } while(isHit == undefined);
  }
}
