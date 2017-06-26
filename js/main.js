var gameplay = new Gameplay();
var arenas = {
  human: new Arena('human', 320, 320),
  ai: new Arena('ai', 320, 320),
};
var log = new Logger();

log.add('Арены для боя созданы.');
log.add('Расставьте корабли на арене игрока слева.');
