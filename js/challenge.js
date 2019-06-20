ChallengeSelection = function(game) {
    this.game = game;
    this.holdicons = [];
    this.challenges = ["Saurian Web", "Wolves Dinner", "Dark Forest"];
    this.keys = ["saurian_web", "wolves_dinner", "dark_forest"];
};

ChallengeSelection.prototype = {
    preload: function() {
        this.game.load.image('saurian_web', 'res/saurian.png');
        this.game.load.image('wolves_dinner', 'res/wolf.png');
        this.game.load.image('dark_forest', 'res/dark_forest.png');
        this.game.load.image('background', 'res/bg.jpg');
    },
    create: function() {
        this.game.stage.backgroundColor = 0x00000;
        this.game.stage.bg = this.game.add.tileSprite(0, 0, game.width, game.height, 'background');

        var style = {font: "32px Helvetica", fill: "#00000"};
        this.game.add.text(120, 120, 'Select your challenge.', style);

        this.createLevelIcons();
        this.animateLevelIcons();
    },
    initProgressData: function() {
    },
    createLevelIcons: function() {
        for (var i = 0; i < this.challenges.length; i++) {
            // calculate position on screen
            var x = 120;
            var y = 180 + (i * 50);

            this.holdicons[i] = this.createLevelIcon(x, y, this.challenges[i], this.keys[i]);

            var backicon = this.holdicons[i].getAt(0);
            backicon.health = i;
            backicon.inputEnabled = true;
            backicon.events.onInputDown.add(this.onSpriteDown, this);

            var onOver = function (group, object, pointer) {
                group.getChildAt(0).addColor("#ffffff", 0);
            };

            var onOut = function (group, object, pointer) {
                group.getChildAt(0).addColor("#00000", 0);
            };

            backicon.events.onInputOver.add(onOver.bind(this, this.holdicons[i]));
            backicon.events.onInputOut.add(onOut.bind(this, this.holdicons[i]));
        }
    },
    createLevelIcon: function(x, y, name, key) {

        // create new group
        var icon_group = this.game.add.group();
        icon_group.x = x;
        icon_group.y = y;

        // keep original position, for restoring after certain tweens
        icon_group.xOrg = x;
        icon_group.yOrg = y;

        // add background
        // var icon = this.game.add.sprite(0, 0, key);
        // icon.anchor.set(0.5);
        // icon.x = 60;
        // icon_group.add(icon);

        var style = {font: "16px Helvetica", fill: "#00000"};
        var txt = this.game.add.text(24, 32, name, style);
        txt.anchor.set(0, 0.5);
        icon_group.add(txt);

        return icon_group;
    },
    onSpriteDown: function(sprite, pointer) {

        // retrieve the icon level
        var challenge = sprite.health;

        // simulate button press animation to indicate selection
        // var IconGroup = this.holdicons[challenge];
        // var tween = this.game.add.tween(IconGroup.scale)
        //     .to({ x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
        //     .to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
        //     .start();
        //
        // tween.onComplete.add(function() {}, this);
        this.onScenarioSelected(sprite.health);
    },
    animateLevelIcons: function() {

        // slide all icons into screen
        for (var i = 0; i < this.holdicons.length; i++) {
            // get variables
            var IconGroup = this.holdicons[i];
            IconGroup.x = -200;
            var x = IconGroup.x;

            // tween animation
            this.game.add.tween(IconGroup).to({x: 120}, 500, Phaser.Easing.Back.Out, true, ((i + 1) * 500));
        }
    },
    onScenarioSelected: function(n) {
        this.game.state.states['game']._scenario = this.keys[n];
        this.state.start('game');
    }
};
