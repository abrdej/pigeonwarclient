var client = {};

client.connect = function () {
    this.ws = new WebSocket('ws://localhost:8080/');

    this.ws.onopen = function open() {
        console.log("test");
    };

    this.ws.onmessage = function incoming(msg) {
        json_data = JSON.parse(msg.data);
        console.log(json_data);

        if (json_data.hasOwnProperty('client_id')) {
            client_id = json_data['client_id'];

        } else if (json_data.hasOwnProperty('entities_pack')) {

            var entities_pack = json_data['entities_pack'];

            for (var i = 0; i < entities_pack.length; i++) {

                var entity_id = entities_pack[i][0];
                var entity_data = [];

                console.log(entity_id);

                entity_data = entities_pack[i][1];

                var entity_name = entity_data[0];
                var entity_health = entity_data[1];
                var entity_power = entity_data[2];
                var entity_index = entity_data[3];

                entities[entity_id] =
                    new Entity(game, entity_name, entity_health, entity_power, entity_index);
            }
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
            update_healths(global_state['healths']);

            // board_container board;
            // std::unordered_map<std::uint32_t, std::int32_t> healths;
            // std::unordered_map<std::uint32_t, std::string> entities_names;
            // std::unordered_map<std::uint32_t, std::vector<std::string>> entities_additional_effects;

        } else if (json_data.hasOwnProperty("animation")) {
            animation.handle(json_data["animation"]);
        }
    }
};

client.send = function (msg) {
    this.ws.send(msg);
};