var client = {};

client.connect = function (port) {
    this.ws = new WebSocket('ws://localhost:' + port + '/');
    // this.ws = new WebSocket('ws://188.68.231.139/:' + port + '/');

    this.ws.onopen = function open() {
        var scenario = game.state.states['game']._scenario;
        var map = game.state.states['game']._map;
        var msg = JSON.stringify({"configure": {"scenario": scenario, "map": map}}) + '\n';
        console.log(msg);
        this.send(msg);
    };

    this.ws.onmessage = function incoming(msg) {
        json_data = JSON.parse(msg.data);
        console.log(json_data);
        msg_queue.push(json_data);
    };
};

client.send = function (msg) {
    this.ws.send(msg);
};
