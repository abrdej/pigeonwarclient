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

            var entities = json_data['entities_pack'];

            for (var i = 0; i < entities.length; i++) {
                if (Array.isArray(entities[i])) {

                    var entity_id = entities[i][0];
                    var entity_name = entities[i][1][0];
                    var entity_health = entities[i][1][1];
                    var entity_power = entities[i][1][2];
                    var entity_pos = index_to_pos(entities[i][1][3]);

                    entities[entity_id] =
                        game.add.sprite(entity_pos[0] * field_size, entity_pos[1] * field_size, entity_name);
                }
            }
        }
    };
};

client.send = function (msg) {
    this.ws.send(msg);
};