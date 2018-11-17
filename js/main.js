var field_size = 60;
var board_cols = 15;
var board_rows = 10;

var game = new Phaser.Game(board_cols * field_size, (board_rows + 2) * field_size, Phaser.CANVAS, 'PigeonWar');

game.state.add('select_scenario', SelectScenario);
game.state.add('select_map', SelectMap);
game.state.add('game', MainGame);
game.state.start('game');
