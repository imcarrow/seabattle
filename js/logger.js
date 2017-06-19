var Logger = function() {
  this.create();
}

Logger.prototype = {
  create: function() {
    document.body.appendChild(document.createElement('br'));
    var span = document.createElement('span');
    span.id = 'logs';
    document.body.appendChild(span);
  },
  add: function(text) {
    var logger = document.getElementById('logs');
    logger.innerHTML += '<br>' + text;
  },
}
