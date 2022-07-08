PlayScenario = function(game) {
    this.game = game;
    this.buttons = [];
    this.scenarios = ['Saurian Web'];
    this.keys = ['saurian_web',  'main_menu'];
};

PlayScenario.prototype = {
    preload: function() {
        this.game.load.image('background', 'res/bg4.jpg');
        this.game.load.image('button_scenario', 'res/button_scenario.png');
        this.game.load.image('main_menu', 'res/button_back.png');
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

            var button_image = '';
            if (this.keys[n] === 'main_menu') {
                button_image = 'main_menu';
            } else {
                button_image = 'button_scenario';
            }

            this.buttons[n] = game.add.button(x_pos, y_pos, button_image, this.onChoiceSelected, this, 1, 0, 2);
            this.buttons[n].name = this.keys[n];
            this.buttons[n].anchor.setTo(0.5, 0.5);

            style = {font: "32px STIXIntegralsSm", fill: "#262020", fontWeight: "bold"};
            var scenarios_text = this.game.add.text(x_pos, y_pos, this.scenarios[n], style);
            scenarios_text.anchor.setTo(0.5, 0.5);

            var onOver = function (text, button) {
                text.scale.setTo(1.1);
                button.scale.setTo(1.1);
            };
            var onOut = function (text, button) {
                text.scale.setTo(1);
                button.scale.setTo(1);
            };

            this.buttons[n].onInputOver.add(onOver.bind(this, scenarios_text, this.buttons[n]), this);
            this.buttons[n].onInputOut.add(onOut.bind(this, scenarios_text, this.buttons[n]), this);
        }
    },
    onChoiceSelected: function(button) {
        if (button.name ==='main_menu') {
            this.state.start(button.name);
        } else {
            this.state.states["game"]._scenario = button.name
            this.state.start("game");
        }
    }
};
