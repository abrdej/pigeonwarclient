JoinGame = function(game) {
    this.game = game;
    this.buttons = [];
    this.button_texts = ["Skirmish", "Back"];
    this.keys = ['skirmish', 'main_menu'];
};

JoinGame.prototype = {
    preload: function() {
        this.game.load.image('background', 'res/bg4.jpg');
        this.game.load.image('skirmish', 'res/button_240.png');
        this.game.load.image('main_menu', 'res/button_180.png');
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
        for (var n = 0; n < this.keys.length; n++) {

            var x_pos = 160;
            var y_pos = 120 + (n * 100);

            this.buttons[n] = game.add.button(x_pos, y_pos, this.keys[n], this.onChoiceSelected, this, 1, 0, 2);
            this.buttons[n].name = this.keys[n];
            this.buttons[n].anchor.setTo(0.5, 0.5);

            style = {font: "32px STIXIntegralsSm", fill: "#262020", fontWeight: "bold"};
            var button_text = this.game.add.text(x_pos, y_pos, this.button_texts[n], style);
            button_text.anchor.setTo(0.5, 0.5);

            var onOver = function (text, button) {
                text.scale.setTo(1.1);
                button.scale.setTo(1.1);
            };
            var onOut = function (text, button) {
                text.scale.setTo(1);
                button.scale.setTo(1);
            };

            this.buttons[n].onInputOver.add(onOver.bind(this, button_text, this.buttons[n]), this);
            this.buttons[n].onInputOut.add(onOut.bind(this, button_text, this.buttons[n]), this);
        }
    },
    onChoiceSelected: function(button) {
        if (button.name ==='skirmish') {
            this.state.states["game"]._scenario = button.name
            this.state.start("game");
        } else {
            this.state.start(button.name);
        }
    }
};
