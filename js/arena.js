var Arena = function(name, width, height) {
  this.name = name;
  this.height = height;
  this.width = width;
  this.coloure = Coloure.blue;
  this.point = new Point(10, 10);
  this.size = 300;
  this.blocks = new Array;
  this.createCanvas();
  this.draw();
  this.setBlocks();
  this.drawGrid();
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
        cs.addEventListener("mousedown", this.mouseDown, false);
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
        this.blocks[i][j] = new Block(this.context, new Point(xg, yg), h);
      }
    }
  },

  mouseDown: function(event) {
    var id = event.target.id;
    var arena = event.view.window.arenas[id];
    arena.click(event.pageX, event.pageY);
  },

  click: function(x, y) {
    this.changeStateBlock(x, y);
  },

  changeStateBlock: function(x, y) {
    var result;
    for(var i = 0; i < 10; i++) {
      for(var j = 0; j < 10; j++) {
        x1 = this.blocks[i][j].point.getX() + this.canvasPosition.x;
        y1 = this.blocks[i][j].point.getY() + this.canvasPosition.y;
        size = this.blocks[i][j].size;
        if((x >= x1 && x<= x1 + size) && (y>= y1 && y < y1 + size)) {
          this.blocks[i][j].quadrate.coloure = Coloure.brown;
          this.blocks[i][j].quadrate.draw();
          break;
        }
      }
    }
  },
}
