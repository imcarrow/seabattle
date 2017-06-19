var arenas = {
  human: new Arena('human', 320, 320),
  ai: new Arena('ai', 320, 320),
};
var log = new Logger();
var gameplay = new Gameplay();

log.add('Арены для боя созданы.');
gameplay.createShips();
log.add('Расставьте корабли на арене слева.');
