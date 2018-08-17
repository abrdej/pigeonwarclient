SelectScenario = function(game) {
    this.game = game;
    this.holdicons = [];
    this.scenarios = ["Saurian Web", "Wolves Dinner", "Dark Forest", "Skirmish"];
    this.keys = ["saurian_web", "wolves_dinner", "dark_forest", "skirmish"];
};

SelectScenario.prototype = {
    preload: function(){
        this.game.load.image('saurian_web', 'res/saurian.png');
        this.game.load.image('wolves_dinner', 'res/wolf.png');
        this.game.load.image('dark_forest', 'res/dark_forest.png');
        this.game.load.image('skirmish', 'res/blow_the_ax.png');
    },
    create: function(){
        this.game.stage.backgroundColor = 0x000000;

        var style = {font: "32px Helvetica", fill: "#FFFFFF"};
        this.game.add.text(240, 30, 'Select a scenario.', style);

        this.createLevelIcons();
        this.animateLevelIcons();
    },
    initProgressData: function() {
    },
    createLevelIcons: function() {
        for (var x = 0; x < this.scenarios.length; x++) {
            // calculate position on screen
            var xpos = 120 + (x * 150);
            var ypos = 120;

            this.holdicons[x] = this.createLevelIcon(xpos, ypos, this.scenarios[x], this.keys[x]);

            var backicon = this.holdicons[x].getAt(0);
            backicon.health = x;
            backicon.inputEnabled = true;
            backicon.events.onInputDown.add(this.onSpriteDown, this);

            var onOver = function (group, object, pointer) {
                group.scale.setTo(1.2);
            };

            var onOut = function (group, object, pointer) {
                group.scale.setTo(1);
            };

            backicon.events.onInputOver.add(onOver.bind(this, this.holdicons[x]));
            backicon.events.onInputOut.add(onOut.bind(this, this.holdicons[x]));
        }
    },
    createLevelIcon: function(xpos, ypos, name, key) {

        // create new group
        var icon_group = this.game.add.group();
        icon_group.x = xpos;
        icon_group.y = ypos;

        // keep original position, for restoring after certain tweens
        icon_group.xOrg = xpos;
        icon_group.yOrg = ypos;

        // add background
        var icon = this.game.add.sprite(0, 0, key);
        icon.anchor.set(0.5);
        icon_group.add(icon);

        var style = {font: "16px Helvetica", fill: "#FFFFFF"};
        var txt = this.game.add.text(24, 32, name, style);
        txt.anchor.set(0.5);
        icon_group.add(txt);

        return icon_group;
    },
    onSpriteDown: function(sprite, pointer) {

        // retrieve the iconlevel
        var scenario = sprite.health;

        // simulate button press animation to indicate selection
        var IconGroup = this.holdicons[scenario];
        var tween = this.game.add.tween(IconGroup.scale)
            .to({ x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
            .to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
            .start();

        tween.onComplete.add(function() {this.onScenarioSelected(sprite.health);}, this);
    },
    animateLevelIcons: function() {

        // slide all icons into screen
        for (var i=0; i < this.holdicons.length; i++) {
            // get variables
            var IconGroup = this.holdicons[i];
            IconGroup.y = IconGroup.y + 600;
            var y = IconGroup.y;

            // tween animation
            this.game.add.tween(IconGroup).to( {y: y - 600}, 500, Phaser.Easing.Back.Out, true, (i * 40));
        }
    },
    onScenarioSelected: function(n) {
        this.game.state.states['game']._scenario = this.keys[n];
        this.state.start('game');
    }
};
