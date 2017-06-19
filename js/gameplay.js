var STAGE_ARANGE_SHIPS = 1;
var STAGE_BATTLE = 2;

var Gameplay = function() {
  this.init();
  this.ships = [];
}

Gameplay.prototype = {
  init: function() {
    this.stage = STAGE_ARANGE_SHIPS;
  }

  createShips: function() {
    ships[0] = new Ship();
  }
}
