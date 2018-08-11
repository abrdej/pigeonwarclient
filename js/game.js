var field_size = 60;
var board_cols = 15;
var board_rows = 10;

function index_to_pos(index) {
    return [index % board_cols, Math.floor(index / board_rows)];
}

var game = new Phaser.Game(board_cols * field_size, board_rows * field_size + field_size, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    entities.loadBitmaps();
}

function loadCompleted() {
    client.connect();
}

function create() {
    for (var i = 0; i < board_cols; i++) {
        for (var j = 0; j < board_rows; j++) {
            var grass = game.add.sprite(i * 60, j * 60, 'Grass');
            grass.inputEnabled = true;
            grass.events.onInputDown.add(onBoard.bind(this, i, j));
        }
    }

    // shooter = game.add.sprite(60, 60, 'shooter');
    //
    // shooter.anchor.set(0);
    //
    // shooter.animations.add('run');
    // shooter.animations.play('run', 10, true);
    //
    // shooter.inputEnabled = true;

    // game.input.onTap.add(onTap, this);
    
}

function print() {

}

function update() {
    // shooter.x += 2;
}

function render() {

}

function onBoard(x, y) {

    var s = '        ' + JSON.stringify({
        on_board: {
            client_id: client_id,
            col: x,
            row: y
        }
    }) + '\n';

    console.log(s);

    client.send(s);

    var msg = { action : "onBoard", x : x, y : y };
    console.log(msg);
}

function onTap(pointer, doubleTap) {
    if (doubleTap) {

    } else {
        console.log(pointer.x);
        console.log(pointer.y);
    }
}