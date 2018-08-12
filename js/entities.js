loadBitmaps = function () {
    game.load.image('EndTurn', 'res/end_turn.png');
    game.load.image('Grass', 'res/grass.png');
    game.load.image('GrassMove', 'res/grass_move.png');
    game.load.image('GrassEnemy', 'res/grass_enemy.png');
    game.load.image('GrassAttack', 'res/grass_attack.png');
    game.load.image('GrassBoost', 'res/grass_boost.png');
    game.load.image('GrassFriendly', 'res/grass_friendly.png');
    game.load.image('GrassSelected', 'res/grass_selected.png');
    game.load.image('Border', 'res/border.png');

    game.load.image('Tree', 'res/tree.png');
    game.load.image('Saurian', 'res/saurian.png');
    game.load.image('Stone', 'res/stone.png');
    game.load.image('Shooter', 'res/shooter.png');
    game.load.image('Native', 'res/native.png');
    game.load.image('Saberhand', 'res/saberhand.png');
    game.load.image('Saurian Web', 'res/saurian_web.png');

    game.load.image('moveable', 'res/moveable.png');
    game.load.image('sabers', 'res/sabers.png');
    game.load.image('invisibility', 'res/invisibility.png');
    game.load.image('bullet', 'res/bullet.png');
    game.load.image('grenade', 'res/grenade.png');
    game.load.image('tongue_of_fire', 'res/tongue_of_fire.png');

    game.load.image('bullet', 'res/bullet.png');
    game.load.image('bum', 'res/bum.png');


    game.load.onLoadComplete.add(loadCompleted, this);

    game.load.start();
};
