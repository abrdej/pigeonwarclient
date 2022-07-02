var lobby_client = {};

lobby_client.connect = function () {
    this.main_server_ws = new WebSocket('ws://localhost:60000/');
    this.main_server_ws.onopen = function open() {
        var scenario = game.state.states['game']._scenario;
        var map = game.state.states['game']._map;
        var msg = JSON.stringify({"configure": {"scenario": scenario, "map": map}}) + '\n';
        console.log(msg);
        this.send(msg);
        lobby_client.main_server_ws.terminate();
        client.connect(60000);
    };
    // this.main_server_ws.onmessage = function incoming(msg) {
    //     //json_data = JSON.parse(msg.data);
    //     //console.log(json_data);
    //     //var port = json_data['port'];
    //     lobby_client.main_server_ws.terminate();
    //     client.connect(60000);
    // };
};
