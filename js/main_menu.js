MainMenu = function(game) {
    this.game = game;
    this.holdicons = [];
    this.buttons = [];
    this.choices = ["Join Game", "Create Game", "Play Scenario"];
    this.keys = ["join_game", "create_game", "play_scenario"];
};

MainMenu.prototype = {
    preload: function() {
        this.game.load.image('background', 'res/bg4.jpg');
        this.game.load.image('join_game', 'res/button_join_game.png');
        this.game.load.image('create_game', 'res/button_make_game.png');
        this.game.load.image('play_scenario', 'res/button_play_scenario.png');
    },
    create: function() {
        this.add.image(0, 0, "background");

        var style = {font: "64px STIXIntegralsSm", fill: "#921b1b", fontWeight: "bold"};
        this.game.add.text(520, 16, 'Pigeon War', style);

        this.createMenuChoices();
    },
    initProgressData: function() {
    },
    createMenuChoices: function() {
        for (var n = 0; n < this.choices.length; n++) {

            var x_pos = 160;
            var y_pos = 120 + (n * 100);

            this.buttons[n] = game.add.button(x_pos, y_pos, this.keys[n], this.onChoiceSelected, this, 1, 0, 2);
            this.buttons[n].name = this.keys[n];
            this.buttons[n].anchor.setTo(0.5, 0.5);

            var onOver = function (object) {
                object.scale.setTo(1.2);
            };

            var onOut = function (object) {
                object.scale.setTo(1);
            };

            this.buttons[n].onInputOver.add(onOver, this);
            this.buttons[n].onInputOut.add(onOut, this);
        }
    },
    onChoiceSelected: function(button) {
        this.game.state.states['game']._scenario = button.name;
        this.state.start('game');
    }
};
