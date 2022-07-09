function makeID(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

CreateGame = function(game) {
    this.game = game;
    this.buttons = [];
    this.button_texts = ["Back"];
    this.keys = ['main_menu'];
};

CreateGame.prototype = {
    preload: function() {
        this.game.load.image('background', 'res/bg4.jpg');
        this.game.load.image('main_menu', 'res/button_180.png');
        this.game.load.image('text_box', 'res/text_box.png');
    },
    create: function() {
        this.add.image(0, 0, "background");

        var style = {font: "64px STIXIntegralsSm", fill: "#921b1b", fontWeight: "bold"};
        this.game.add.text(520, 16, 'Pigeon War', style);

        this.createGameHash();
        this.createMenuChoices();
    },
    initProgressData: function() {
    },
    createGameHash: function () {
        this.game_hash = makeID(14);

        var style = {font: "28px STIXIntegralsSm", fill: "#921b1b", fontWeight: "bold",
            backgroundColor: '#b7b4aa' };
        var share_hash_text = this.game.add.text(160, 120, '  Share game hash\n  to your opponent  ', style);
        share_hash_text.anchor.setTo(0.5, 0.5);

        var game_hash_button = game.add.button(160, 220, "text_box", this.onCopyGameHash, this, 1, 0, 2);
        game_hash_button.name = 'text_box';
        game_hash_button.anchor.setTo(0.5, 0.5);

        style = {font: "28px STIXIntegralsSm", fill: "#921b1b", fontWeight: "bold"};

        var game_hash = this.game.add.text(160, 220, this.game_hash, style);
        game_hash.anchor.setTo(0.5, 0.5);

        var onOver = function (object) {
            object.scale.setTo(1.1);
            game_hash.scale.setTo(1.1);
        };
        var onOut = function (object) {
            object.scale.setTo(1);
            game_hash.scale.setTo(1);
        };

        game_hash_button.onInputOver.add(onOver, this);
        game_hash_button.onInputOut.add(onOut, this);
    },
    onCopyGameHash: function () {
        navigator.clipboard.writeText(this.game_hash).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    },
    createMenuChoices: function() {
        for (var n = 0; n < this.keys.length; n++) {

            var x_pos = 160;
            var y_pos = 120 + ((2 + n) * 100);

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
        this.state.start(button.name);
    }
};
