SelectMap = function(game) {
    this.game = game;
    // this.holdicons = [];
    // this.scenarios = ["Saurian Web", "Wolves Dinner", "Dark Forest", "Skirmish"];
    // this.keys = ["saurian_web", "wolves_dinner", "dark_forest", "skirmish"];
};

SelectMap.prototype = {
    preload: function(){
        this.game.load.image('saurian_web', 'res/saurian.png');
        this.game.load.image('wolves_dinner', 'res/wolf.png');
        this.game.load.image('dark_forest', 'res/dark_forest.png');
        this.game.load.image('skirmish', 'res/blow_the_ax.png');
    },
    create: function(){
        this.game.stage.backgroundColor = 0x000000;

        var style = {font: "32px Helvetica", fill: "#FFFFFF"};
        this.game.add.text(240, 30, 'Select a map.', style);

        // this.dragger = this.game.tileSprite(0, 0, 5 * this.game.width, this.game.height, "transp");
        this.dragger = game.add.sprite(this.game.width / 2, this.game.height / 2, "dark_forest");
        this.dragger.anchor.set(0.5);

        this.dragger.inputEnabled = true;
        this.dragger.input.enableDrag(false);
        this.dragger.input.allowVerticalDrag = false;
        this.dragger.input.boundsRect = new Phaser.Rectangle(game.width - this.dragger.width,
            game.height - this.dragger.height,
            this.dragger.width * 2 - game.width,
            this.dragger.height * 2 - game.height);

        //var icon = game.add.image(0, 0, "dark_forest");
        //icon.tint = colors[k];
        //this.scrollingMap.addChild(icon);

        this.currentPage = 0;
        this.pageSelectors = [];
        // var rowLength = thumbWidth * columns + spacing * (columns - 1);
        // var leftMargin = (game.width - rowLength) / 2;
        // var colHeight = thumbHeight * rows + spacing * (rows - 1);
        // var topMargin = (game.height - colHeight) / 2;

        this.dragger.events.onDragStart.add(function(){
            this.dragger.startPosition = this.dragger.x;
            this.dragger.currentPosition = this.dragger.x;
        }, this);
        this.dragger.events.onDragStop.add(function(){
            if(this.dragger.startPosition - this.dragger.x > game.width / 8) {
                this.changePage(1);
            }
            else{
                if(this.dragger.startPosition - this.dragger.x < -game.width / 8) {
                    this.changePage(-1);
                }
                else{
                    this.changePage(0);
                }
            }
        }, this);
    },
    changePage: function(page){
        this.currentPage += page;
        // this.pageText.text = "Swipe to select level page ("
        //     + (this.currentPage + 1).toString() + " / " + 5 + ")";
        var tween = game.add.tween(this.dragger).to({
            x: this.currentPage * -game.width
        }, 300, Phaser.Easing.Cubic.Out, true);
    }
};