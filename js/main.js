var field_size = 60;
var board_cols = 15;
var board_rows = 10;

var game = new Phaser.Game(board_cols * field_size, (board_rows + 2) * field_size, Phaser.CANVAS, 'PigeonWar');

game.state.add('main_menu', MainMenu);
game.state.add('join_game', JoinGame);
game.state.add('create_game', CreateGame);
game.state.add('play_scenario', PlayScenario);
game.state.add('select_scenario', SelectScenario);
game.state.add('map_selection', MapSelection);
game.state.add('challenges', ChallengeSelection);
game.state.add('game', MainGame);
game.state.start('main_menu');
