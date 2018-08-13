// var _ = {};
// require(['lodash'], function (lodash) {
//     _ = lodash;
// });

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

    console.log("update");

    if (is_animation_running) {
        console.log("is_animation_running");
    } else if (msg_queue.length !== 0) {

        console.log("msg queue");

        var json_data = msg_queue.shift();
        if (json_data.hasOwnProperty('client_id')) {
            client_id = json_data['client_id'];

        } else if (json_data.hasOwnProperty('entities_pack')) {

            var entities_pack = json_data['entities_pack'];

            for (var i = 0; i < entities_pack.length; i++) {

                var entity_id = entities_pack[i][0];
                var entity_data = [];

                entity_data = entities_pack[i][1];

                var entity_name = entity_data[0];
                var entity_health = entity_data[1];
                var entity_power = entity_data[2];
                var entity_index = entity_data[3];

                entities[entity_id] =
                    new Entity(game, entity_name, entity_health, entity_power, entity_index);
            }

            bring_entities_to_top();

        } else if (json_data.hasOwnProperty('local_state')) {
            var local_state = json_data['local_state'];

            possible_movements = local_state['possible_movements'];
            valid_movements = local_state['valid_movements'];
            selected_index = local_state['selected_index'];
            actual_target_type = local_state['actual_target_type'];
            button_bitmaps = local_state['button_bitmaps'];
            selected_entity_name = local_state['entity_name'];

            board.update_state();
            update_for_entity();

        } else if (json_data.hasOwnProperty('game_state')) {
            var global_state = json_data['game_state'];

            // update_positions(global_state['board']);
            // update_healths(global_state['healths']);

            // board_container board;
            // std::unordered_map<std::uint32_t, std::int32_t> healths;
            // std::unordered_map<std::uint32_t, std::string> entities_names;
            // std::unordered_map<std::uint32_t, std::vector<std::string>> entities_additional_effects;

            entities_additional_effects = global_state['entities_additional_effects'];
            // console.log(entities_additional_effects);
            // if (entities_additional_effects) {
            //     console.log(entities_additional_effects[0]);
            // }


        } else if (json_data.hasOwnProperty("animation")) {
            animation.handle(json_data["animation"]);

        } else if (json_data.hasOwnProperty("remove_entity")) {
            var entity_to_remove = json_data["remove_entity"];
            entities[entity_to_remove].destroy();
            delete entities[entity_to_remove];

        } else if (json_data.hasOwnProperty("description")) {
            var hint = json_data["description"];
            console.log("hint: " + hint);
            panel.set_hint(hint);

        } else if (json_data.hasOwnProperty("move_entity")) {
            var entity_id_to_move = json_data["move_entity"];
            var from_index = json_data["from_index"];
            var to_index = json_data["to_index"];
            entities[entity_id_to_move].setPosition(to_index);
        }
    }
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

function onGetHint(n) {
    var msg = '        ' + JSON.stringify({
        get_button_description: {
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