var field_size = 60;
var board_cols = 15;
var board_rows = 10;

var text_rect_width = 35;
var text_rect_height = 20;

function index_to_pos(index) {
    return [index % board_cols, Math.floor(index / board_cols)];
}

var game = new Phaser.Game(board_cols * field_size, (board_rows + 2) * field_size, Phaser.CANVAS, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    loadBitmaps();
}

function loadCompleted() {
    client.connect();
}

function create() {
    board.initialize(board_cols, board_rows);
    panel.initialize(board_cols, board_rows, 5);
    animation.initialize();

    game.physics.arcade.enable(this);
}

function print() {

}

function update() {

}

function render() {

}

function onBoard(x, y) {

    var msg = '        ' + JSON.stringify({
        on_board: {
            client_id: client_id,
            col: x,
            row: y
        }
    }) + '\n';

    console.log(msg);
    client.send(msg);
}

function onButton(n) {
    var msg = '        ' + JSON.stringify({
        on_button: {
            client_id: client_id,
            button: n
        }
    }) + '\n';

    console.log(msg);
    client.send(msg);
}

function onTap(pointer, doubleTap) {
    if (doubleTap) {

    } else {
        console.log(pointer.x);
        console.log(pointer.y);
    }
}