
var entities = {};

entities.loadBitmaps = function () {
    game.load.image('Grass', 'res/grass.png');
    game.load.image('Tree', 'res/tree.png');
    game.load.image('Saurian', 'res/saurian.png');
    game.load.image('Stone', 'res/stone.png');
    game.load.image('Shooter', 'res/shooter.png');
    game.load.image('Native', 'res/native.png');

    game.load.onLoadComplete.add(loadCompleted, this);

    game.load.start();
};