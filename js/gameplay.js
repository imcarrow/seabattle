var STAGE_ARRANGE_SHIPS = 1;
var STAGE_BATTLE = 2;

var Gameplay = function() {
  this.init();
  this.ships = [];
  this.direction = VERTICAL_DIRECTION;
}

Gameplay.prototype = {
  init: function() {
    this.stage = STAGE_ARRANGE_SHIPS;
  },

  mouseDown: function(event) {
    var id = event.target.id;
    var arena = event.view.window.arenas[id];
    var block = arena.click(event.pageX, event.pageY);
    if(id == 'human' && gameplay.stage == STAGE_ARRANGE_SHIPS) {
      arena.createShip(block);
    }
    if(id == 'ai' && gameplay.stage == STAGE_BATTLE && block.hit == undefined) {
      var hit = arena.shot(block);
      if(!hit) {
        arenas.human.shotAI();
      }
    }
  },

  setDirection: function(button) {
    if(this.direction == VERTICAL_DIRECTION) {
      this.direction = HORIZONTAL_DIRECTION;
      button.textContent = 'по вертикали';
    } else {
      this.direction = VERTICAL_DIRECTION;
      button.textContent = 'по горизонтали';
    }
  },

  startGame: function() {
    this.stage = STAGE_BATTLE;
    arenas.ai.arrangeShips();
    log.add('Игра началась.Ходите...');
  },

  autoArrangeShip: function() {
    arenas.human.arrangeShips();
  },
}
