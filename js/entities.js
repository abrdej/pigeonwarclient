loadBitmaps = function () {
    game.load.image('EndTurn', 'res/end_turn.png');
    game.load.image('Grass', 'res/grass.png');
    game.load.image('GrassMove', 'res/grass_move.png');
    game.load.image('GrassDamage', 'res/grass_damage.png');
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
    game.load.image('Destroyer', 'res/destroyer.png');
    game.load.image('Warrior', 'res/warrior.png');
    game.load.image('Rocket Thrower', 'res/thrower.png');
    game.load.image('Spider', 'res/spider.png');
    game.load.image('Sorcerer', 'res/sorcerer.png');
    game.load.image('Guardian', 'res/guardian.png');
    game.load.image('Golem', 'res/golem.png');
    game.load.image('Droid', 'res/droid.png');
    game.load.image('Commander', 'res/commander.png');
    game.load.image('Monk', 'res/monk.png');
    game.load.image('Poisoner', 'res/poisoner.png');
    game.load.image('Samurai', 'res/samurai.png');
    game.load.image('Sniper', 'res/sniper.png');

    game.load.image('Saurian Web', 'res/saurian_web.png');

    game.load.image('moveable', 'res/moveable.png');
    game.load.image('sabers', 'res/sabers.png');
    game.load.image('invisibility', 'res/invisibility.png');
    game.load.image('bullet', 'res/bullet.png');
    game.load.image('grenade', 'res/grenade.png');
    game.load.image('tongue_of_fire', 'res/tongue_of_fire.png');

    game.load.image('bullet', 'res/bullet.png');
    game.load.image('bum', 'res/bum.png');
    game.load.image('grenade', 'res/grenade.png');
    game.load.image('detonation', 'res/detonation.png');
    game.load.image('sabers_attack', 'res/sabers_attack.png');
    game.load.image('tongue_of_fire', 'res/tongue_of_fire.png');
    game.load.image('saberhand_transparency', 'res/saberhand_transparency.png');
    game.load.image('drain', 'res/drain.png');
    game.load.image('counterattack', 'res/counterattack.png');
    game.load.image('native_attack', 'res/native_attack.png');
    game.load.image('magic_bullet', 'res/magic_bullet.png');
    game.load.image('magic_splash', 'res/magic_splash.png');
    game.load.image('monk_use_1', 'res/monk_use_1.png');
    game.load.image('monk_use_2', 'res/monk_use_2.png');
    game.load.image('monk_use_3', 'res/monk_use_3.png');
    game.load.image('blow_the_ax', 'res/blow_the_ax.png');
    game.load.image('armor', 'res/armor.png');
    game.load.image('warrior_blow', 'res/warrior_blow.png');
    game.load.image('warrior_attack', 'res/warrior_attack.png');
    game.load.image('warrior_immortal', 'res/warrior_immortal.png');
    game.load.image('immortality', 'res/immortality.png');
    game.load.image('prison_connection', 'res/prison_connection.png');
    game.load.image('protection_field', 'res/protection_field.png');
    game.load.image('sorcerer_attack', 'res/sorcerer_attack.png');


    game.load.onLoadComplete.add(loadCompleted, this);

    game.load.start();
};
